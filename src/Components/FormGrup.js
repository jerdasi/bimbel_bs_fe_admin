import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import moment from "moment";
import {data} from "autoprefixer";
import Swal from "sweetalert2";
// import { useEffect } from "react";

export default function FormGrup({
                                     showGroup,
                                     setShowGroup,
                                     idPaket,
                                     setIdPaket,
                                 }) {
    const [guru, setGuru] = useState([]);
    const [paket, setPaket] = useState([]);
    const [formData, setFormData] = useState({
        nama_grup: "",
        id_paket: 0,
        id_guru: 0,
        kuota: 0,
    });
    const [grup, setGrup] = useState([]);
    const [jenisPaket, setJenisPaket] = useState([]);

    const [hari, setHari] = useState([]);
    const [jam, setJam] = useState([]);
    const [operasional, setOperasional] = useState([]);
    const [hariGuru, setHariGuru] = useState([]);
    const [jamGuru, setJamGuru] = useState([]);
    const [jadwal, setJadwal] = useState([]);
    const [jadwalGuru, setJadwalGuru] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/guru`).then((res) => {
            setGuru(res.data.data);
        });
        axios
            .get(`${process.env.REACT_APP_API}/paket-bimbingan`)
            .then((res) => {
                setPaket(res.data.data);
            });
        axios
            .get(`${process.env.REACT_APP_API}/hari`)
            .then((res) => setHari(res.data.data));
        axios
            .get(`${process.env.REACT_APP_API}/jam`)
            .then((res) => setJam(res.data.data));
        axios
            .get(`${process.env.REACT_APP_API}/hari-jam`)
            .then((res) => setOperasional(res.data.data));

        if (idPaket != 0) {
            axios
                .get(`${process.env.REACT_APP_API}/paket-bimbingan/${idPaket}`)
                .then((res) => {
                    setJenisPaket(res.data.data);
                    setJadwal(
                        [...Array(res.data.data.jumlah_pertemuan)].map(
                            (item) => {
                                return {id_hari: 0, id_jam: 0};
                            }
                        )
                    );
                });
            setFormData({...formData, id_paket: idPaket});
            axios
                .get(
                    `${process.env.REACT_APP_API}/grup-bimbel?paket=${idPaket}`
                )
                .then((res) => {
                    console.log(res.data.data);
                    setGrup(res.data.data);
                });
        }
        if (formData.id_guru != 0) {
            axios
                .get(
                    `${process.env.REACT_APP_API}/waktu-guru?guru=${formData.id_guru}`
                )
                .then((res) => {
                    setJadwalGuru(res.data.data);
                    let hari = res.data.data.map((item) => item.id_hari);
                    let jam = res.data.data.map((item) => item.id_jam);
                    setHariGuru([...new Set(hari)]);
                    setJamGuru([...new Set(jam)]);
                    console.log([...new Set(hari)], [...new Set(jam)]);
                });
        }
    }, [idPaket, formData.id_guru]);

    const handleShow = () => {
        setIdPaket(0);
        setFormData({
            nama_grup: "",
            id_paket: 0,
            id_guru: 0,
            kuota: 0,
        });
        setShowGroup(!showGroup);
    };

    const reset = () => {
        setFormData({
            nama_grup: "",
            id_paket: 0,
            id_guru: 0,
            kuota: 0,
        });
    };

    const fixJadwal = (toSet) => {
        if (
            jadwalGuru.filter(
                (item) =>
                    item.id_hari == toSet.id_hari && item.id_jam == toSet.id_jam
            ).length !== -1
        ) {
            return true;
        }
        return false;
    };

    //Untuk convert id_hari dan id_jam menjadi id_hari_jam
    const convertToIdHariJam = () => {
        return jadwal.map(item => {
            return {
                id_hari_jam: operasional.filter(
                    (o) =>
                        o.id_hari == item.id_hari && o.id_jam == item.id_jam
                )[0]?.id
            }
        })
    }

    //Ini untuk daftar grup dan jadwalnya
    const daftarGrup = () => {
        let daftarJadwal = ({id_grup: null, jadwal: convertToIdHariJam()})

        axios
            .post(`${process.env.REACT_APP_API}/grup-bimbel`, formData)
            .then((res) => {
                setGrup([...grup, res.data.data]);
                daftarJadwal = {...daftarJadwal, id_grup: res.data.data.id}
                axios.post(`${process.env.REACT_APP_API}/jadwal-grup`, daftarJadwal)
                    .then((res) => {
                        console.log(res.data.data)
                        Swal.fire("Berhasil", "Berhasil Menambahkan Grup dan Jadwalnya", "success");
                        handleShow();
                    })
            })
            .catch((err) => console.log("Gagal" + err.message));
        // console.log(formData);
    };

    const getGrup = (id) => {
        axios
            .get(`${process.env.REACT_APP_API}/grup-bimbel/${id}`)
            .then((res) => setFormData(res.data.data));
    };

    const getJadwal = (id) => {
        axios.get(`${process.env.REACT_APP_API}/jadwal-grup?grup=${id}`)
            .then((res) => {
                setJadwal([...res.data.data.map(item => {
                    let {id_hari, id_jam} = operasional.filter(o => item.id_hari_jam == o.id)[0]
                    return {id_hari, id_jam}
                })])
                // console.log({JadwalGrup: res.data.data})
                // console.log({Operasional: operasional})
                // console.log({Jadwal: jadwal})
                // console.log({JadwalBaru :

                // })
                // setJenisPaket({
                //     ...jenisPaket
                // })
                // setJadwal(res.data.data)
            })
    }

    return (
        <div className="">
            {/* Form Data Siswa */}
            <div
                className={[
                    "background w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center top-0 left-0 z-50 absolute",
                    showGroup ? "absolute" : "hidden",
                ].join(" ")}
            >
                <div className="w-5/6 md:w-1/2 box-form h-3/4 overlow-auto">
                    <form
                        action=""
                        className="border h-full bg-white rounded-lg flex flex-col relative"
                    >
                        <div className="header-form flex items-center relative mb-2 border-b border-abu-bs h-[10%] p-4">
                            <h1 className="text-2xl font-bold text-merah-bs tracking-widest">
                                Tambah Grup
                                {/* {formData.id ? "Edit" : "Tambah"} Guru */}
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={handleShow}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            <div className="title font-bold">
                                <p>
                                    Grup Paket Bimbingan{" "}
                                    <span className="text-merah-bs">
                                        {paket.filter((p) => p.id == idPaket)
                                            .nama_paket ?? "Baru"}
                                    </span>
                                </p>
                            </div>
                            <div
                                className="w-full h-48 flex flex-col justify-center flex-wrap overflow-auto hide-scrollbar box-border">
                                {grup.length == 0
                                    ? "Belum Ada Grup Terdaftar"
                                    : grup.map((item) => (
                                        <div
                                            className="h-full w-3/5 md:w-1/3 border border-biru-bs rounded-md mr-2 flex justify-center flex items-center hover:bg-merah-bs hover:text-white"
                                            onClick={(e) => {
                                                getGrup(item.id);
                                                getJadwal(item.id)
                                            }}
                                        >
                                            {item.nama_grup}
                                        </div>
                                    ))}
                                <div
                                    className="h-12 w-12 bg-merah-bs rounded-md border border-black flex items-center justify-center"
                                    title="Tambah Baru"
                                    onClick={(e) => reset()}
                                >
                                    <i class="fa-solid fa-plus text-2xl text-white"></i>
                                </div>
                            </div>

                            <div className="title font-bold mt-8">
                                <p>Tambah Grup Paket Bimbingan</p>
                            </div>
                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Nama Grup</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="nama_grup"
                                        id="nama_grup"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Grup A"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nama_grup: e.target.value,
                                            })
                                        }
                                        value={formData.nama_grup}
                                    />
                                </div>
                            </div>

                            <div className="row flex gap-4">
                                <div className="row mb-3 w-full">
                                    <div className="title mb-1">
                                        <p>Paket Bimbingan</p>
                                    </div>
                                    <div className="input-field flex gap-2">
                                        <select
                                            name="hari_operasional"
                                            id="hari_operasional"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    id_paket: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        >
                                            <option value="all" disabled>
                                                Pilih Salah Satu
                                            </option>
                                            {paket.map((item) => {
                                                return (
                                                    <option
                                                        value={item.id}
                                                        selected={
                                                            item.id == idPaket
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {item.nama_paket}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Field Pilih Guru */}
                            <div className="row mb-3 w-full">
                                <div className="title mb-1">
                                    <p>Guru</p>
                                </div>
                                <div
                                    className="w-full h-48 flex flex-col flex-wrap overflow-auto hide-scrollbar box-border">
                                    {guru.map((item) => (
                                        <div
                                            className={[
                                                "h-full w-3/5 md:w-1/3 border border-biru-bs rounded-md mr-2 flex justify-center relative group",
                                                item.id == formData.id_guru
                                                    ? "shadow border-2 border-merah-bs"
                                                    : "",
                                            ].join(" ")}
                                            onClick={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    id_guru: parseInt(item.id),
                                                })
                                            }
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_API}/${item.foto}`}
                                                alt=""
                                                className="h-full object-cover rounded-md group-hover:blur-sm"
                                            />
                                            <div
                                                className="absolute bottom-0 left-0 rounded-b-md w-full p-2 font-bold bg-merah-bs text-white hidden group-hover:block">
                                                {item.nama}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Field Nomor Telepon */}
                            <div className="row mb-3 w-full">
                                <div className="title mb-1">
                                    <p>Kuota</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="number"
                                        name="kuota"
                                        id="kuota"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                kuota: parseInt(e.target.value),
                                            })
                                        }
                                        value={formData.kuota}
                                        // value={formData.telepon}
                                    />
                                </div>
                            </div>

                            <div className="title font-bold mt-8 mb-1">
                                <p>Atur Jadwal Grup</p>
                            </div>
                            <div className="w-full h-32 overflow-auto">
                                {jadwal.map((item, index) => (
                                    <div className="w-full flex gap-2 mb-1">
                                        <select
                                            name="hari_operasional"
                                            id="hari_operasional"
                                            value={item.id_hari == 0 ? "all" : item.id_hari}
                                            className="p-2 w-2/5 rounded-md border border-abu-bs"
                                            onChange={(e) => {
                                            let result = [...jadwal];
                                            result[index] = {
                                                ...result[index],
                                                id_hari: parseInt(
                                                    e.target.value
                                                ),
                                            };
                                            setJadwal(result);
                                        }}>
                                            <option value="all">Pilih Salah Satu</option>
                                            {hariGuru.map(item => (
                                                <option value={item}>
                                                    {hari.filter(
                                                        (h) =>
                                                            h.id == item
                                                    )[0]?.nama_hari}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            name="jam_operasional"
                                            id="jam_operasional"
                                            value={item.id_jam == 0 ? "all" : item.id_jam}
                                            className="p-2 w-2/5 rounded-md border border-abu-bs"
                                            onChange={(e) => {
                                                let result = [...jadwal];
                                                result[index] = {
                                                    ...result[index],
                                                    id_jam: parseInt(
                                                        e.target.value
                                                    ),
                                                };
                                                setJadwal(result);
                                            }}>
                                            <option value="all">Pilih Salah Satu</option>
                                            {jadwalGuru
                                                .filter(
                                                    (jg) =>
                                                        jg?.id_hari ==
                                                        jadwal[index]
                                                            ?.id_hari
                                                )
                                                .map((jg) => (
                                                    <option
                                                        value={jg.id_jam}
                                                        selected={true}
                                                    >
                                                        {
                                                            jam.filter(
                                                                (j) =>
                                                                    j.id ==
                                                                    jg.id_jam
                                                            )[0]
                                                                ?.nama_rentang
                                                        }
                                                    </option>
                                                ))}
                                        </select>
                                        <button
                                            className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                fixJadwal(jadwal[index]);
                                            }}
                                        >
                                            Set
                                        </button>
                                    </div>
                                ))}
                                {/*{[...Array(jenisPaket.jumlah_pertemuan)].map(*/}
                                {/*    (item, index) => (*/}
                                {/*        <div*/}
                                {/*            className="w-full flex gap-2 mb-1"*/}
                                {/*            disabled={() =>*/}
                                {/*                fixJadwal(jadwal[index])*/}
                                {/*            }*/}
                                {/*        >*/}
                                {/*            <select*/}
                                {/*                name="hari_operasional"*/}
                                {/*                id="hari_operasional"*/}
                                {/*                className="p-2 w-2/5 rounded-md border border-abu-bs"*/}
                                {/*                onChange={(e) => {*/}
                                {/*                    let result = [...jadwal];*/}
                                {/*                    result[index] = {*/}
                                {/*                        ...result[index],*/}
                                {/*                        id_hari: parseInt(*/}
                                {/*                            e.target.value*/}
                                {/*                        ),*/}
                                {/*                    };*/}
                                {/*                    setJadwal(result);*/}
                                {/*                }}*/}
                                {/*                // value={jadwal[index]?.id_hari}*/}
                                {/*            >*/}
                                {/*                <option value="all">*/}
                                {/*                    Pilih Hari*/}
                                {/*                </option>*/}
                                {/*                {hariGuru.map((item) => (*/}
                                {/*                    <option value={item} selected={item == jadwal[index].id_hari? true : false}>*/}
                                {/*                        {*/}
                                {/*                            hari.filter(*/}
                                {/*                                (h) =>*/}
                                {/*                                    h.id == item*/}
                                {/*                            )[0].nama_hari*/}
                                {/*                        }*/}
                                {/*                    </option>*/}
                                {/*                ))}*/}
                                {/*            </select>*/}
                                {/*            <select*/}
                                {/*                name="hari_operasional"*/}
                                {/*                id="hari_operasional"*/}
                                {/*                className="p-2 w-2/5 rounded-md border border-abu-bs"*/}
                                {/*                onChange={(e) => {*/}
                                {/*                    let result = [...jadwal];*/}
                                {/*                    result[index] = {*/}
                                {/*                        ...result[index],*/}
                                {/*                        id_jam: parseInt(*/}
                                {/*                            e.target.value*/}
                                {/*                        ),*/}
                                {/*                    };*/}
                                {/*                    setJadwal(result);*/}
                                }}
                                {/*            >*/}
                                {/*                <option value="all">*/}
                                {/*                    Pilih Jam*/}
                                {/*                </option>*/}
                                {/*                {jadwalGuru*/}
                                {/*                    .filter(*/}
                                {/*                        (jg) =>*/}
                                {/*                            jg?.id_hari ==*/}
                                {/*                            jadwal[index]*/}
                                {/*                                ?.id_hari*/}
                                {/*                    )*/}
                                {/*                    .map((jg) => (*/}
                                {/*                        <option*/}
                                {/*                            value={jg.id_jam}*/}
                                {/*                            selected={true}*/}
                                {/*                        >*/}
                                {/*                            {*/}
                                {/*                                jam.filter(*/}
                                {/*                                    (j) =>*/}
                                {/*                                        j.id ==*/}
                                {/*                                        jg.id_jam*/}
                                {/*                                )[0]*/}
                                {/*                                    ?.nama_rentang*/}
                                {/*                            }*/}
                                {/*                        </option>*/}
                                {/*                    ))}*/}
                                {/*            </select>*/}
                                {/*            <button*/}
                                {/*                className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white"*/}
                                {/*                onClick={(e) => {*/}
                                {/*                    e.preventDefault();*/}
                                {/*                    fixJadwal(jadwal[index]);*/}
                                {/*                }}*/}
                                {/*            >*/}
                                {/*                Set*/}
                                {/*            </button>*/}
                                {/*        </div>*/}
                                {/*    )*/}
                                {/*)}*/}
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            {formData.id && (
                                <button
                                    className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        daftarGrup();
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                            {!formData.id && (
                                <button
                                    className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        daftarGrup();
                                    }}
                                >
                                    Simpan
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
