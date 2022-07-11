import React, { useState, useContext } from "react";
import { PaketContext } from "../Context/PaketBimbingan";

export default function FormPaket(props) {
    const {
        jenjang,
        showPaket,
        setShowPaket,
        paketItem,
        setPaketItem,
        formPurpose,
        setFormPurpose,
    } = useContext(PaketContext);

    // Fungsi untuk ToggleForm
    const handleShow = () => {
        if (showPaket) {
            setPaketItem({
                nama_paket: "",
                id_jenjang: 0,
                jumlah_pertemuan: 0,
                deskripsi: "",
                harga: 0,
            });
        }
        setShowPaket(!showPaket);
    };

    // Fungsi untuk Tambah Jenjang
    const handleAddEditPaket = (event) => {
        event.preventDefault();
        const { nama_paket, id_jenjang, jumlah_pertemuan, harga } = paketItem;

        if (
            nama_paket !== "" &&
            id_jenjang !== 0 &&
            jumlah_pertemuan != 0 &&
            harga !== 0
        ) {
            props.handleTambahEditPaket(paketItem);
            handleShow();
        } else {
            alert("Perhatikan Input Data");
        }
    };

    return (
        <div className="">
            <div
                className={[
                    "background w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center top-0 left-0 z-50",
                    showPaket ? "absolute" : "hidden",
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
                                Paket Bimbingan
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={handleShow}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            {/* Nama Paket Bimbingan */}
                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Nama Paket</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="nama_paket"
                                        id="nama_paket"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Paket Minggu Ceria"
                                        onChange={(e) =>
                                            setPaketItem({
                                                ...paketItem,
                                                nama_paket: e.target.value,
                                            })
                                        }
                                        value={paketItem.nama_paket}
                                    />
                                </div>
                            </div>

                            {/* Masuk Jenjang Pendidikan Apa */}
                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Jenjang Pendidikan</p>
                                </div>
                                <div className="input-field">
                                    <select
                                        name="jenjang_pendidikan"
                                        id="jenjang_pendidikann"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setPaketItem({
                                                ...paketItem,
                                                id_jenjang: e.target.value,
                                            })
                                        }
                                        value={paketItem.id_jenjang}
                                    >
                                        {jenjang.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_jenjang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Jumlah Pertemuan Berapa */}
                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Jumlah Pertemuan / Minggu</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="number"
                                        name="jumlah_pertemuan"
                                        id="jumlah_pertemuan"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setPaketItem({
                                                ...paketItem,
                                                jumlah_pertemuan: parseInt(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                        value={parseInt(
                                            paketItem.jumlah_pertemuan
                                        )}
                                    />
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
                                        value={paketItem.deskripsi}
                                        onChange={(e) =>
                                            setPaketItem({
                                                ...paketItem,
                                                deskripsi: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Harga Paket / Bulan</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="number"
                                        name="harga_paket"
                                        id="harga_paket"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: 180000"
                                        value={parseInt(paketItem.harga)}
                                        onChange={(e) =>
                                            setPaketItem({
                                                ...paketItem,
                                                harga: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            <button
                                className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                onClick={(e) => {
                                    handleAddEditPaket(e);
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
