import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function FormTestimoni({
    showForm,
    setShowForm,
    handleTestimoni,
    setTestimoni,
}) {
    const [siswa, setSiswa] = useState([]);
    const [pendaftaran, setPendaftaran] = useState([]);
    const [filterPendaftaran, setFilterPendaftaran] = useState([]);
    const [filterTool, setFilterTool] = useState({
        nama_siswa: "",
    });
    const [formData, setFormData] = useState({
        id_pendaftaran: 0,
        deskripsi: "",
    });

    useEffect(() => {
        let nama_siswa = [];
        axios.get(`${process.env.REACT_APP_API}/peserta-didik`).then((res) => {
            nama_siswa = [...res.data.data];
            setSiswa([...res.data.data]);
        });
        axios
            .get(`${process.env.REACT_APP_API}/testimoni/pendaftaran`)
            .then((res) => {
                let hasil = res.data.data.map((item) => {
                    return {
                        ...item,
                        nama: nama_siswa.filter((s) => s.id == item.id_siswa)[0]
                            ?.nama,
                    };
                });
                console.log(hasil);
                setPendaftaran([...hasil]);
                setFilterPendaftaran([...hasil]);
            });
        searchTool("");
    }, []);

    const resetFormData = () => {
        setFormData({
            id_pendaftaran: 0,
            deskripsi: "",
        });
    };

    const handleShow = () => {
        if (showForm) {
            resetFormData();
        }
        setShowForm(!showForm);
    };

    const searchTool = (value) => {
        let hasil = pendaftaran.map((item) => {
            return {
                ...item,
                nama: siswa.filter((s) => s.id == item.id_siswa)[0]?.nama,
            };
        });
        // console.log(hasil)
        if (!value) {
            setFilterPendaftaran([...hasil]);
        } else {
            let result = [...hasil].filter(
                (item) =>
                    item.nama.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
            setFilterPendaftaran(result);
            // console.log(result)
        }
    };

    const tambahTestimoni = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API}/testimoni`, formData)
            .then((res) => {
                axios
                    .get(`${process.env.REACT_APP_API}/testimoni`)
                    .then((res) => {
                        setTestimoni(res.data.data);
                        Swal.fire(
                            "Berhasil",
                            "Testimoni Baru Berhasil Ditambahkan!",
                            "success"
                        );
                    });
                // handleTestimoni(res.data.data);
            });
        setShowForm(false);
        // console.log(formData)
    };

    return (
        <div className="">
            <div className="w-1/2 md:w-1/6 fixed bottom-20 md:bottom-10 right-4 md:right-10 flex justify-end">
                <button
                    className="w-5/6 bg-merah-bs text-white rounded-lg text-lg flex items-center justify-center p-2"
                    onClick={handleShow}
                >
                    <span className="text-lg mr-2">
                        <i class="fa-solid fa-plus"></i>
                    </span>{" "}
                    Tambah Testimoni
                </button>
            </div>
            <div
                className={[
                    "background w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center top-0 left-0 z-50",
                    showForm ? "absolute" : "hidden",
                ].join(" ")}
            >
                <div className="w-5/6 md:w-1/2 box-form h-3/4 overlow-auto">
                    <form
                        action=""
                        className="border h-full bg-white rounded-lg flex flex-col relative"
                    >
                        <div className="header-form flex items-center relative mb-2 border-b border-abu-bs h-[10%] p-4">
                            <h1 className="text-2xl font-bold text-merah-bs tracking-widest">
                                Tambah Testimoni
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={handleShow}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            {/* Siswa */}
                            <div className="row mb-6">
                                <div className="title mb-1">
                                    <p>Cari Siswa Bimbingan Terdaftar</p>
                                </div>
                                <div className="input-field relative">
                                    <input
                                        type="text"
                                        name="pendaftaran"
                                        id="pendaftaran"
                                        // disabled={
                                        //     formValue.id_siswa != -1
                                        //         ? true
                                        //         : false
                                        // }
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Bambang Anak Pak Budi"
                                        onChange={(e) => {
                                            setFilterTool({
                                                ...filterTool,
                                                nama_siswa: e.target.value,
                                            });
                                            searchTool(e.target.value);
                                        }}
                                        value={filterTool.nama_siswa}
                                        // value={formPendaftaran.nama_siswa}
                                    />
                                    <div className="absolute bottom-0 right-0 w-8 h-full flex items-center cursor-pointer">
                                        {formData.id_pendaftaran < 1 && (
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        )}

                                        {formData.id_pendaftaran >= 1 && (
                                            <i
                                                class="fa-solid fa-xmark hover:bg-merah-bs hover:text-white rounded-md p-1"
                                                onClick={(e) => {
                                                    setFilterTool({
                                                        ...filterTool,
                                                        nama_siswa: "",
                                                    });
                                                    setFormData({
                                                        ...formData,
                                                        id_pendaftaran: 0,
                                                    });
                                                }}
                                            ></i>
                                        )}
                                    </div>
                                </div>
                                <div className="result-search w-full h-48 border-x border-b border-abu-bs rounded-md p-2 pt-0 overflow-auto">
                                    <h1 className="font-semibold sticky top-0 left-0 backdrop-blur-sm py-2 bg-white/30">
                                        Nama Siswa
                                    </h1>
                                    <ul>
                                        {filterPendaftaran.length ? (
                                            filterPendaftaran.map((item) => (
                                                <li
                                                    className="p-2 hover:bg-merah-bs hover:text-white hover:rounded-md border-b border-abu-bs"
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            id_pendaftaran:
                                                                item.id,
                                                        });
                                                        setFilterTool({
                                                            ...filterTool,
                                                            nama_siswa:
                                                                item.nama,
                                                        });
                                                    }}
                                                >
                                                    {`${item.nama} - ${item.nama_grup} - ${item.nama_paket}`}
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-center opacity-50">
                                                Tidak ada siswa
                                            </p>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="row mb-6">
                                <div className="title mb-1">
                                    <p>Silahkan Isi Testimoni Anda!</p>
                                </div>
                                <div className="input-field">
                                    <textarea
                                        name="deskripsi"
                                        id=""
                                        rows="5"
                                        className="p-2 border border-abu-bs w-full rounded-md"
                                        placeholder="cth: Mantap!"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                deskripsi: e.target.value,
                                            });
                                        }}
                                        value={formData.deskripsi}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            <button
                                className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                onClick={(e) => tambahTestimoni(e)}
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
