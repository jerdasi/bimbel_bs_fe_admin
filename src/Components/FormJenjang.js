import axios from "axios";
import React, { useState } from "react";

export default function FormJenjang(props) {
    const [show, setShow] = useState(false);
    const [jenjang, setJenjang] = useState({
        nama_jenjang: "",
        akronim: "",
        deskripsi: "",
        harga: 0,
    });

    const handleShow = () => {
        setShow(!show);
        console.log(show);
    };

    const handleAddJenjang = () => {
        props.handleTambahJenjang(jenjang);
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
                    Daftar Jenjang
                </button>
            </div>
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
                                Tambah Jenjang Pendidikan
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={handleShow}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            <div className="w-full flex gap-2">
                                <div className="row mb-3 w-3/4">
                                    <div className="title mb-1">
                                        <p>Nama Jenjang</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="nama_jenjang"
                                            id="nama_jenjang"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="cth: Sekolah Menengah Pertama"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/4">
                                    <div className="title mb-1">
                                        <p>Akronim</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="akronim"
                                            id="akronim"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="cth: SMP"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Deskripsi</p>
                                </div>
                                <div className="input-field">
                                    <textarea
                                        name="alamat"
                                        id=""
                                        rows="5"
                                        className="p-2 border border-abu-bs w-full rounded-md"
                                        placeholder="cth: Ini adalah paket mantap kali"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Harga</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="number"
                                        name="harga"
                                        id="harga"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: 180000"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            <button
                                className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                onClick={handleAddJenjang}
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
