import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function FormSiswa({ handlePeserta, show, setShow, siswa }) {
    const [filteredKelas, setFilteredKelas] = useState([]);
    const [jenjang, setJenjang] = useState([]);
    const [kelas, setKelas] = useState([]);
    const [formData, setFormData] = useState(siswa);

    const navigate = useNavigate();

    const handleShow = () => {
        if (show) {
            setFormData({
                nama: "",
                tempat: "",
                tanggal_lahir: new Date(),
                alamat: "",
                id_jenjang: 0,
                asal_sekolah: "",
                fotoPeserta: null,
                nama_ayah: "",
                nama_ibu: "",
                telepon_anak: "",
                telepon_ayah: "",
                telepon_ibu: "",
            });
        }

        setShow(!show);
    };

    const tambahSiswa = (event) => {
        event.preventDefault();

        if (
            formData.nama != "" ||
            formData.tempat != "" ||
            formData.alamat != "" ||
            formData.id_jenjang != 0 ||
            formData.asal_sekolah != "" ||
            formData.telepon_ayah != "" ||
            formData.telepon_ibu != ""
        ) {
            delete formData["id_kelas"];
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };
            let form_data = new FormData();
            for (let key in formData) {
                form_data.append(key, formData[key]);
            }
            axios
                .post(
                    `${process.env.REACT_APP_API}/peserta-didik`,
                    form_data,
                    config
                )
                .then((res) => {
                    handlePeserta(res.data.data);
                    handleShow();
                    Swal.fire(
                        "Berhasil",
                        "Berhasil Menamabah Peserta Didik Baru! Silahkan Lanjutkan Pendaftaran!",
                        "success"
                    );
                    navigate("/kelola-pendaftaran");
                })
                .catch((err) => console.log(err));
        } else {
            Swal.fire(
                "Gagal",
                "Harap Lengkapi Form Pengisian Yang Bersifat Wajib",
                "error"
            );
        }
    };

    const editSiswa = (event) => {
        event.preventDefault();
        delete formData["id_kelas"];
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        let form_data = new FormData();
        for (let key in formData) {
            form_data.append(key, formData[key]);
        }
        axios
            .put(
                `${process.env.REACT_APP_API}/peserta-didik/${formData.id}`,
                form_data,
                config
            )
            .then((res) => {
                handlePeserta(res.data.data, formData.id);
                handleShow();
                Swal.fire(
                    "Berhasil",
                    "Berhasil Mengubah Informasi Peserta Didik",
                    "success"
                );
            });
    };

    // Use Effect
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/jenjang-pendidikan`)
            .then((res) => {
                setJenjang([...res.data.data]);
            });
        axios.get(`${process.env.REACT_APP_API}/kelas`).then((res) => {
            setKelas([...res.data.data]);
            setFilteredKelas([...res.data.data]);
        });
        setFormData(siswa);
    }, [siswa]);

    // Function Filter Kelas Berdasarkan Jenjang
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
                    Data Siswa
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
                                {formData.id ? "Edit" : "Tambah"} Siswa
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={handleShow}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>
                                        Nama{" "}
                                        <span className="text-merah-bs">*</span>
                                    </p>
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
                                    <p>
                                        Tempat, Tanggal Lahir{" "}
                                        <span className="text-merah-bs">*</span>
                                    </p>
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

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>
                                        Alamat{" "}
                                        <span className="text-merah-bs">*</span>
                                    </p>
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

                            <div className="row mb-3 flex gap-2">
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>
                                            Jenjang{" "}
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="input-field">
                                        <select
                                            name="jenjang"
                                            id="jenjang"
                                            defaultValue={0}
                                            value={parseInt(
                                                formData.id_jenjang
                                            )}
                                            className="p-2 border border-abu-bs w-full rounded-md"
                                            onChange={(e) => {
                                                filterKelas(e.target.value);
                                                setFormData({
                                                    ...formData,
                                                    id_jenjang: parseInt(
                                                        e.target.value
                                                    ),
                                                });
                                            }}
                                        >
                                            <option value={0} disabled>
                                                Pilih Salah Satu
                                            </option>
                                            {jenjang.map((item, index) => (
                                                <option
                                                    value={item.id}
                                                    key={index}
                                                >
                                                    {`${item.nama_jenjang} - ${item.akronim}`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Kelas</p>
                                    </div>
                                    <select
                                        name="kelas"
                                        id="kelas"
                                        defaultValue={0}
                                        value={formData.id_kelas}
                                        className="p-2 border border-abu-bs w-full rounded-md"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                id_kelas: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="0" disabled>
                                            Pilih Salah Satu
                                        </option>
                                        {filteredKelas.map((item, index) => (
                                            <option value={item.id} key={index}>
                                                {item.tingkat_kelas}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>
                                        Asal Sekolah{" "}
                                        <span className="text-merah-bs">*</span>
                                    </p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="asal_sekolah"
                                        id="asal_sekolah"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Sekolah Dasar 002 Berau"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                asal_sekolah: e.target.value,
                                            })
                                        }
                                        value={formData.asal_sekolah}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>
                                        Foto{" "}
                                        <span className="text-merah-bs">*</span>
                                    </p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="file"
                                        name="foto_siswa"
                                        id="foto_siswa"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                fotoPeserta: e.target.files[0],
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row mb-3 flex gap-2">
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>
                                            Nama Ayah{" "}
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="nama_ayah"
                                            id="nama_ayah"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="cth: Budi Bapaknya Bambang"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nama_ayah: e.target.value,
                                                })
                                            }
                                            value={formData.nama_ayah}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>
                                            Nama Ibu{" "}
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="nama_ibu"
                                            id="nama_ibu"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="cth: Angel Mamaknya Bambang"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nama_ibu: e.target.value,
                                                })
                                            }
                                            value={formData.nama_ibu}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3 w-full">
                                <div className="title mb-1">
                                    <p>Telepon Anak</p>
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
                                                telepon_anak: e.target.value,
                                            })
                                        }
                                        value={formData.telepon_anak}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3 flex gap-2">
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>
                                            Telepon Ayah{" "}
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="telepon_ayah"
                                            id="telepon_ayah"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="081212345678"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    telepon_ayah:
                                                        e.target.value,
                                                })
                                            }
                                            value={formData.telepon_ayah}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>
                                            Telepon Ibu{" "}
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="telepon_ibu"
                                            id="telepon_ibu"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="081234567890"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    telepon_ibu: e.target.value,
                                                })
                                            }
                                            value={formData.telepon_ibu}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            {formData.id && (
                                <button
                                    className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                    onClick={editSiswa}
                                >
                                    Edit
                                </button>
                            )}
                            {!formData.id && (
                                <button
                                    className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                    onClick={tambahSiswa}
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
