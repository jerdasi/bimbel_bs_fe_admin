import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import PreviewPhoto from "./SmartComponent/PreviewPhoto";
import FormGuru from "./FormGuru";
import moment from "moment";
import Swal from "sweetalert2";
import FormTestimoni from "./FormTestimoni";
import _ from "lodash";

export default function Absensi() {
    const [guru, setGuru] = useState([]);
    const [dataAbsensi, setDataAbsensi] = useState([]);
    const [payload, setPayload] = useState({
        id_guru: 0,
        total_jam: 0,
    });
    const [filterAbsensi, setFilterAbsensi] = useState([]);
    const [searchAbsenGuru, setSearchAbsenGuru] = useState({
        using_time: false,
        id_guru: 0,
        tanggal_awal: moment().format("yyyy-MM-DD"),
        tanggal_akhir: moment().format("yyyy-MM-DD"),
    });

    const tambahAbsensi = () => {
        if (payload.id_guru != 0 && payload.total_jam != 0) {
            axios
                .post(`${process.env.REACT_APP_API}/absensi`, payload)
                .then((res) => {
                    let hasil = [...dataAbsensi, res.data.data];
                    hasil = _.orderBy(
                        hasil,
                        (a) => moment(a.createdAt),
                        "desc"
                    );
                    setDataAbsensi([...hasil]);
                    setFilterAbsensi([...hasil]);
                    setPayload({
                        id_guru: 0,
                        total_jam: 0,
                    });
                });
        } else {
            alert("Guru dan Jam Kerja Harus Diinnput");
        }
    };

    const hapusAbsensi = (id) => {
        axios
            .delete(`${process.env.REACT_APP_API}/absensi/${id}`)
            .then((res) => {
                let hasil = dataAbsensi.filter(
                    (item) => item.id != parseInt(res.data.data.id)
                );
                setDataAbsensi([...hasil]);
                setFilterAbsensi([...hasil]);
            });
    };

    const searchAbsensi = () => {
        if (searchAbsenGuru.id_guru == 0) {
            if (searchAbsenGuru.using_time) {
                let hasil = _.filter(
                    dataAbsensi,
                    (item) =>
                        moment(item.createdAt).format("yyyy-MM-DD") <=
                            searchAbsenGuru.tanggal_akhir &&
                        moment(item.createdAt).format("yyyy-MM-DD") >=
                            searchAbsenGuru.tanggal_awal
                );
                setFilterAbsensi([...hasil]);
            } else {
                setFilterAbsensi([...dataAbsensi]);
            }
        } else {
            let hasil = dataAbsensi.filter(
                (item) => item.id_guru == searchAbsenGuru.id_guru
            );
            if (searchAbsenGuru.using_time) {
                hasil = _.filter(
                    hasil,
                    (item) =>
                        moment(item.createdAt).format("yyyy-MM-DD") <=
                            searchAbsenGuru.tanggal_akhir &&
                        moment(item.createdAt).format("yyyy-MM-DD") >=
                            searchAbsenGuru.tanggal_awal
                );
                setFilterAbsensi([...hasil]);
            } else {
                setFilterAbsensi([...hasil]);
            }
        }
    };

    const getTotalJam = (arr) => {
        return _.sumBy(arr, (item) => item.total_jam);
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/guru`)
            .then((res) => setGuru(res.data.data));
        axios.get(`${process.env.REACT_APP_API}/absensi`).then((res) => {
            setDataAbsensi(res.data.data);
            setFilterAbsensi(res.data.data);
        });
    }, []);

    return (
        <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col pb-8 md:pb-0">
            <h1 className="text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                Kelola Absensi
            </h1>
            <div className="w-full h-full md:h-[75vh]">
                <>
                    <div className="title mt-4 font-bold">
                        Tambahkan Absensi Guru
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap gap-2 mb-2">
                        <select
                            name="guru"
                            id="guru"
                            className="p-2 w-full md:w-1/2 rounded-md border border-abu-bs"
                            value={payload.id_guru}
                            onChange={(e) =>
                                setPayload({
                                    ...payload,
                                    id_guru: parseInt(e.target.value),
                                })
                            }
                        >
                            <option value={0} disabled>
                                Pilih Salah Satu
                            </option>
                            {guru.map((item) => (
                                <option value={item.id}>{item.nama}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Input Total Jam Kerja Hari Ini"
                            className="p-2 w-full md:w-1/2 rounded-md border border-abu-bs"
                            value={payload.total_jam}
                            onChange={(e) =>
                                setPayload({
                                    ...payload,
                                    total_jam: parseInt(e.target.value),
                                })
                            }
                        />
                    </div>
                    <button
                        className="w-full md:w-1/5 border border-black p-2 rounded-md bg-merah-bs text-white"
                        onClick={tambahAbsensi}
                    >
                        Tambahkan
                    </button>
                </>

                <>
                    <div className="title mt-10 font-bold">
                        Riwayat Absensi Guru
                    </div>
                    <select
                        name="guru"
                        id="guru"
                        className="p-2 w-full mb-2 rounded-md border border-abu-bs"
                        value={searchAbsenGuru.id_guru}
                        onChange={(e) =>
                            setSearchAbsenGuru({
                                ...searchAbsenGuru,
                                id_guru: parseInt(e.target.value),
                            })
                        }
                    >
                        <option value={0}>Semua Guru</option>
                        {guru.map((item) => (
                            <option value={item.id}>{item.nama}</option>
                        ))}
                    </select>
                    <div className="flex flex-wrap md:flex-nowrap gap-2 mb-2">
                        <input
                            type="checkbox"
                            name="using-time"
                            id="using-time"
                            value={searchAbsenGuru.using_time}
                            onChange={(e) =>
                                setSearchAbsenGuru({
                                    ...searchAbsenGuru,
                                    using_time: e.target.checked,
                                })
                            }
                        />
                        <input
                            type="date"
                            name="tanggal_awal"
                            id="tanggal_awal"
                            disabled={!searchAbsenGuru.using_time}
                            className="h-full border border-abu-bs rounded-md p-2 w-full md:w-1/2"
                            defaultValue={searchAbsenGuru.tanggal_awal}
                            onChange={(e) =>
                                setSearchAbsenGuru({
                                    ...searchAbsenGuru,
                                    tanggal_awal: moment(e.target.value).format(
                                        "yyyy-MM-DD"
                                    ),
                                })
                            }
                        />
                        <input
                            type="date"
                            name="tanggal_akhir"
                            id="tanggal_akhir"
                            disabled={!searchAbsenGuru.using_time}
                            className="h-full border border-abu-bs rounded-md p-2 w-full md:w-1/2"
                            defaultValue={searchAbsenGuru.tanggal_akhir}
                            onChange={(e) =>
                                setSearchAbsenGuru({
                                    ...searchAbsenGuru,
                                    tanggal_akhir: moment(
                                        e.target.value
                                    ).format("yyyy-MM-DD"),
                                })
                            }
                        />
                    </div>
                    <div className="flex w-full gap-4 items-center">
                        <button
                            className="w-1/2 md:w-1/5 border border-black p-2 rounded-md bg-merah-bs text-white"
                            onClick={searchAbsensi}
                        >
                            Cari
                        </button>
                        <p className="w-1/2">
                            <span className="font-bold">Total Jam : </span>
                            {getTotalJam(filterAbsensi)} jam
                        </p>
                    </div>
                </>

                <>
                    <div className="result-search w-full h-[40vh] border border-abu-bs rounded-md p-2 pt-0 overflow-auto mt-3">
                        <h1 className="font-semibold sticky top-0 left-0 backdrop-blur-sm py-2 bg-white/30">
                            Riwayat
                        </h1>
                        <ul>
                            {filterAbsensi.length ? (
                                filterAbsensi.map((item) => (
                                    <li
                                        className="p-2 hover:bg-merah-bs hover:text-white hover:rounded-md border-b border-abu-bs relative"
                                        onClick={() => {
                                            // setFormPendaftaran({
                                            //     ...formPendaftaran,
                                            //     nama_siswa: item.nama,
                                            //     id_jenjang: item.id_jenjang,
                                            // });
                                            // setFormValue({
                                            //     ...formValue,
                                            //     id_siswa: item.id,
                                            // });
                                        }}
                                    >
                                        {`${
                                            guru.filter(
                                                (g) => g.id == item.id_guru
                                            )[0]?.nama
                                        } - ${item.total_jam} Jam / ${moment(
                                            item.createdAt
                                        ).format("yyyy-MM-DD")}`}
                                        <button
                                            className="p-1 mt-1 bg-merah-bs text-white rounded-md border border-merah-bs w-fit absolute right-0 top-0"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                hapusAbsensi(item.id);
                                            }}
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center opacity-50">
                                    Tidak ada absensi
                                </p>
                            )}
                        </ul>
                    </div>
                </>
            </div>
        </div>
    );
}
