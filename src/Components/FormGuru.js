import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// import { useEffect } from "react";

export default function FormGuru({ handleGuru, show, setShow, guru }) {
    const [filteredKelas, setFilteredKelas] = useState([]);
    // const [show, setShow] = useState(false);
    const [hari, setHari] = useState([]);
    const [jam, setJam] = useState([]);
    const [operasional, setOperasional] = useState([]);
    const [kelas, setKelas] = useState([]);
    const [formData, setFormData] = useState(guru);

    const handleShow = () => {
        setFormData({
            nama: "",
            tempat: "",
            tanggal_lahir: moment().format("DD-MM-YYYY"),
            pendidikan_terakhir: "",
            fotoGuru: null,
            alamat: "",
            telepon: "",
            motivasi_mengajar: "",
        });
        setShow(!show);
    };

    const tambahGuru = (event) => {
        event.preventDefault();
        // delete formData["id_kelas"];
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        let form_data = new FormData();
        for (let key in formData) {
            form_data.append(key, formData[key]);
        }
        axios
            .post(`${process.env.REACT_APP_API}/guru`, form_data, config)
            .then((res) => {
                handleGuru(res.data.data);
                setShow();
            })
            .catch((err) => console.log(err));
    };

    const editGuru = (event) => {
        event.preventDefault();
        // delete formData["id_kelas"];
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        let form_data = new FormData();
        for (let key in formData) {
            form_data.append(key, formData[key]);
        }
        axios
            .put(
                `${process.env.REACT_APP_API}/guru/${formData.id}`,
                form_data,
                config
            )
            .then((res) => {
                handleGuru(res.data.data, formData.id);
                handleShow();
            });
        // handlePeserta("Tes", 35);
    };

    // Use Effect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/hari`).then((res) => {
            setHari([...res.data.data]);
        });
        axios.get(`${process.env.REACT_APP_API}/jam`).then((res) => {
            setJam([...res.data.data]);
        });
        axios.get(`${process.env.REACT_APP_API}/hari-jam`).then((res) => {
            setOperasional(res.data.data);
        });
        // axios.get(`${process.env.REACT_APP_API}/kelas`).then((res) => {
        //     setKelas([...res.data.data]);
        //     setFilteredKelas([...res.data.data]);
        // });
        setFormData(guru);
    }, [guru]);

    const filterKelas = (id) => {
        setFilteredKelas(
            kelas.filter((item) => {
                if (id !== "" || id !== undefined) {
                    return item.id_jenjang == id;
                } else {
                    return item;
                }
            })
        );
    };

    return (
        <div className="">
            {/* Button Tambah Data Siswa */}
            <div className="w-1/2 md:w-1/6 inline fixed bottom-20 md:bottom-10 right-4 md:right-10 flex justify-end">
                <button
                    className="w-5/6 bg-merah-bs text-white rounded-lg text-lg flex items-center justify-center p-2"
                    onClick={handleShow}
                >
                    <span className="text-lg mr-2">
                        <i class="fa-solid fa-plus"></i>
                    </span>{" "}
                    Data Guru
                </button>
            </div>

            {/* Form Data Siswa */}
            <div
                className={[
                    "background w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center top-0 left-0 z-50",
                    show ? "absolute" : "hidden",
                ].join(" ")}
            >
                <div className="w-5/6 md:w-1/2 box-form h-3/4 overlow-auto">
                    <form
                        action=""
                        className="border h-full bg-white rounded-lg flex flex-col relative"
                    >
                        <div className="header-form flex items-center relative mb-2 border-b border-abu-bs h-[10%] p-4">
                            <h1 className="text-2xl font-bold text-merah-bs tracking-widest">
                                {formData.id ? "Edit" : "Tambah"} Guru
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={(e) => setShow(!show)}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Nama</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="nama_siswa"
                                        id="nama_siswa"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Bambang Anak Pak Budi"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nama: e.target.value,
                                            })
                                        }
                                        value={formData.nama}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Tempat, Tanggal Lahir</p>
                                </div>
                                <div className="input-field flex gap-2">
                                    <input
                                        type="text"
                                        name="tempat_siswa"
                                        id="tempat_siswa"
                                        className="p-2 w-1/2 rounded-md border border-abu-bs"
                                        placeholder="cth: Medan"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tempat: e.target.value,
                                            })
                                        }
                                        value={formData.tempat}
                                    />
                                    <input
                                        type="date"
                                        name="tanggal_siswa"
                                        id="tanggal_siswa"
                                        className="p-2 w-1/2 rounded-md border border-abu-bs"
                                        placeholder="dd-mm-yyyy"
                                        defaultValue={moment(
                                            formData.tanggal_lahir
                                        ).format("yyyy-MM-DD")}
                                        value={moment(
                                            formData.tanggal_lahir
                                        ).format("yyyy-MM-DD")}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tanggal_lahir: moment(
                                                    e.target.value
                                                ).format("yyyy-MM-DD"),
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="row mb-3 w-3/4">
                                    <div className="title mb-1">
                                        <p>Foto</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="file"
                                            name="foto_guru"
                                            id="foto_guru"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    fotoGuru: e.target.files[0],
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/4">
                                    <div className="title mb-1">
                                        <p>Pend. Terakhir</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="pendidikan_terakhir"
                                            id="pendidikan_terakhir"
                                            placeholder="S1"
                                            className="p-[11px] w-full rounded-md border border-abu-bs"
                                            value={formData.pendidikan_terakhir}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    pendidikan_terakhir:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Alamat</p>
                                </div>
                                <div className="input-field">
                                    <textarea
                                        name="alamat"
                                        id=""
                                        rows="5"
                                        className="p-2 border border-abu-bs w-full rounded-md"
                                        placeholder="cth: Jl. Menuju Hati Yang Ikhlas dan Bersih"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                alamat: e.target.value,
                                            });
                                        }}
                                        value={formData.alamat}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="row mb-3 w-full">
                                <div className="title mb-1">
                                    <p>Telepon</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="telepon_anak"
                                        id="telepon_anak"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="081212345678"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                telepon: e.target.value,
                                            })
                                        }
                                        value={formData.telepon}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Motivasi Mengajar</p>
                                </div>
                                <div className="input-field">
                                    <textarea
                                        name="alamat"
                                        id=""
                                        rows="5"
                                        className="p-2 border border-abu-bs w-full rounded-md"
                                        placeholder="cth: Menyukseskan anak bangsa"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                motivasi_mengajar:
                                                    e.target.value,
                                            });
                                        }}
                                        value={formData.motivasi_mengajar}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="flex justify-between mb-1 items-center">
                                    <div className="title text-merah-bs font-bold">
                                        <p>Ketersediaan Mengajar</p>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-merah-bs text-white rounded-md">
                                            Tambah Jadwal
                                        </button>
                                    </div>
                                </div>

                                <div className="input-field h-fit max-h-96 overflow-y-auto">
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                    >
                                        <option value="all">Semua Hari</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="checkbox"
                                        name="all_option"
                                        id="all_option"
                                        className="mr-2"
                                    />
                                    Pilih Semua
                                    <br />
                                    {operasional.map((item) => (
                                        <>
                                            <input
                                                type="checkbox"
                                                value={item.id}
                                                className="mr-2"
                                            />
                                            {`${
                                                hari.find(
                                                    (h) => h.id == item.id_hari
                                                ).nama_hari
                                            }, ${
                                                jam.find(
                                                    (j) => j.id == item.id_jam
                                                ).nama_rentang
                                            }`}
                                            <br />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            {formData.id && (
                                <button
                                    className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                    onClick={editGuru}
                                >
                                    Edit
                                </button>
                            )}
                            {!formData.id && (
                                <button
                                    className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                    onClick={tambahGuru}
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
