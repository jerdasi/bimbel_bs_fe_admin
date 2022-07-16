import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function FormTestimoni({ showForm, setShowForm }) {
    const [siswa, setSiswa] = useState([]);
    const [pendaftaran, setPendaftaran] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/peserta-didik`)
            .then((res) => setSiswa([...res.data.data]));
        axios
            .get(`${process.env.REACT_APP_API}/pendaftaran`)
            .then((res) => setPendaftaran([...res.data.data]));
    }, []);

    const handleShow = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="">
            <div className="w-1/2 md:w-1/6 inline fixed bottom-20 md:bottom-10 right-4 md:right-10 flex justify-end">
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
                                        // onChange={(e) => {
                                        //     handleSearch(e);
                                        // }}
                                        // value={formPendaftaran.nama_siswa}
                                    />
                                    <div className="absolute bottom-0 right-0 w-8 h-full flex items-center cursor-pointer">
                                        {/* {formValue.id_siswa == -1 && (
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        )} */}

                                        {/* {formValue.id_siswa != -1 && (
                                            <i
                                                class="fa-solid fa-xmark hover:bg-merah-bs hover:text-white rounded-md p-1"
                                                onClick={(e) => {
                                                    setFormPendaftaran({
                                                        ...formPendaftaran,
                                                        nama_siswa: "",
                                                    });
                                                    setFormValue({
                                                        ...formValue,
                                                        id_siswa: -1,
                                                    });
                                                }}
                                            ></i>
                                        )} */}
                                    </div>
                                </div>
                                <div className="result-search w-full h-48 border-x border-b border-abu-bs rounded-md p-2 pt-0 overflow-auto">
                                    <h1 className="font-semibold sticky top-0 left-0 backdrop-blur-sm py-2 bg-white/30">
                                        Nama Siswa
                                    </h1>
                                    <ul>
                                        {/* {filteredSiswa.length ? (
                                            filteredSiswa.map((item) => (
                                                <li
                                                    className="p-2 hover:bg-merah-bs hover:text-white hover:rounded-md border-b border-abu-bs"
                                                    onClick={() => {
                                                        setFormPendaftaran({
                                                            ...formPendaftaran,
                                                            nama_siswa:
                                                                item.nama,
                                                        });
                                                        setFormValue({
                                                            ...formValue,
                                                            id_siswa: item.id,
                                                        });
                                                    }}
                                                >
                                                    {`${item.nama} - ${item.asal_sekolah}`}
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-center opacity-50">
                                                Tidak ada siswa
                                            </p>
                                        )} */}
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
                                        // onChange={(e) => {
                                        //     setFormData({
                                        //         ...formData,
                                        //         alamat: e.target.value,
                                        //     });
                                        // }}
                                        // value={formData.alamat}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            <button
                                className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                // onClick={(e) => daftarPeserta(e)}
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
