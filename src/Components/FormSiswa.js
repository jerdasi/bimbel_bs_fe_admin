import React, { useState } from "react";

export default function FormSiswa() {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
        console.log(show);
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
                    Data Siswa
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
                                Tambah Siswa
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
                                    <p>Nama</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="nama_siswa"
                                        id="nama_siswa"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Bambang Anak Pak Budi"
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
                                        name="nama_siswa"
                                        id="nama_siswa"
                                        className="p-2 w-1/2 rounded-md border border-abu-bs"
                                        placeholder="cth: Medan"
                                    />
                                    <input
                                        type="date"
                                        name="nama_siswa"
                                        id="nama_siswa"
                                        className="p-2 w-1/2 rounded-md border border-abu-bs"
                                    />
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
                                    ></textarea>
                                </div>
                            </div>

                            <div className="row mb-3 flex gap-2">
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Kelas</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="nama_siswa"
                                            id="nama_siswa"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="cth: VII"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Jenjang</p>
                                    </div>
                                    <div className="input-field">
                                        <select
                                            name="jenjang"
                                            id="jenjang"
                                            className="p-2 border border-abu-bs w-full rounded-md"
                                        >
                                            <option
                                                value="none"
                                                selected
                                                disabled
                                            >
                                                Pilih Salah Satu
                                            </option>
                                            <option value="SD">
                                                Sekolah Dasar - SD
                                            </option>
                                            <option value="SD">
                                                Sekolah Menengah Pertama - SMP
                                            </option>
                                            <option value="SD">
                                                Sekolah Menengah Dasar - SD
                                            </option>
                                            <option value="SD">
                                                Belum Sekolah
                                            </option>
                                            <option value="SD">TK</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Asal Sekolah</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="asal_sekolah"
                                        id="asal_sekolah"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Sekolah Dasar 002 Berau"
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Foto</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="file"
                                        name="foto_siswa"
                                        id="foto_siswa"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                    />
                                </div>
                            </div>

                            <div className="row mb-3 flex gap-2">
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Nama Ayah</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="nama_ayah"
                                            id="nama_ayah"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="cth: Budi Bapaknya Bambang"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Nama Ibu</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="nama_ibu"
                                            id="nama_ibu"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="cth: Angel Mamaknya Bambang"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3 flex gap-2">
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Telepon Ayah</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="telepon_ayah"
                                            id="telepon_ayah"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="081212345678"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Telepon Ibu</p>
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="telepon_ibu"
                                            id="telepon_ibu"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            placeholder="081234567890"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            <button className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
