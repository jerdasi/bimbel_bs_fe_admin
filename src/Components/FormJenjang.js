import axios from "axios";
import React, { useState, useContext } from "react";
import { PaketContext } from "../Context/PaketBimbingan";

export default function FormJenjang(props) {
    const {
        jenjangItem,
        setJenjangItem,
        showJenjang,
        setShowJenjang,
        formPurpose,
        setFormPurpose,
    } = useContext(PaketContext);

    // Fungsi untuk ToggleForm
    const handleShow = () => {
        if (showJenjang) {
            setJenjangItem({
                nama_jenjang: "",
                akronim: "",
                deskripsi: "",
            });
        }
        setShowJenjang(!showJenjang);
    };

    // Fungsi untuk Tambah Jenjang
    const handleAddEditJenjang = (event) => {
        event.preventDefault();
        const { nama_jenjang, akronim } = jenjangItem;
        if (nama_jenjang !== "" && akronim !== "") {
            props.handleTambahEditJenjang(jenjangItem);
            handleShow();
        } else {
            alert("Perhatikan Input Data");
        }
    };

    return (
        <div className="">
            <div className="w-1/2 md:w-1/6 inline fixed bottom-20 md:bottom-10 right-4 md:right-10 flex justify-end drop-shadow-lg">
                <button
                    className="w-5/6 bg-merah-bs text-white rounded-lg text-lg flex items-center justify-center p-2 border border-white"
                    onClick={() => {
                        setFormPurpose("Simpan");
                        handleShow();
                    }}
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
                    showJenjang ? "absolute" : "hidden",
                ].join(" ")}
            >
                <div className="w-5/6 md:w-1/2 box-form h-3/4 overlow-auto">
                    <form
                        action=""
                        className="border h-full bg-white rounded-lg flex flex-col relative"
                    >
                        <div className="header-form flex items-center relative mb-2 border-b border-abu-bs h-[10%] p-4">
                            <h1 className="text-2xl font-bold text-merah-bs tracking-widest">
                                {formPurpose === "Simpan" ? "Tambah" : "Edit"}{" "}
                                Jenjang Pendidikan
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
                                            onChange={(e) =>
                                                setJenjangItem({
                                                    ...jenjangItem,
                                                    nama_jenjang:
                                                        e.target.value,
                                                })
                                            }
                                            value={jenjangItem.nama_jenjang}
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
                                            onChange={(e) =>
                                                setJenjangItem({
                                                    ...jenjangItem,
                                                    akronim: e.target.value,
                                                })
                                            }
                                            value={jenjangItem.akronim}
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
                                        name="deskripsi"
                                        id="deskripsi"
                                        rows="5"
                                        className="p-2 border border-abu-bs w-full rounded-md"
                                        placeholder="cth: Ini adalah paket mantap kali"
                                        onChange={(e) =>
                                            setJenjangItem({
                                                ...jenjangItem,
                                                deskripsi: e.target.value,
                                            })
                                        }
                                        value={jenjangItem.deskripsi}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            <button
                                className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                onClick={(e) => {
                                    setShowJenjang();
                                    handleAddEditJenjang(e);
                                }}
                            >
                                {formPurpose}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
