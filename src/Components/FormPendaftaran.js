import React, { useState } from "react";

export default function FormPendaftaran() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [formValue, setFormValue] = useState({
        id_siswa: -1,
        id_paket: -1,
        tanggal_pendaftaran: "",
        total_pembayaran: null,
    });

    const [formPendaftaran, setFormPendaftaran] = useState({
        nama_siswa: "",
    });
    const siswa = [
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Bambang Anaknya PakBudi",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
        {
            nama: "Jeremia Daniel Silitonga",
            asal_sekolah: "SMP Negeri 001 Kongbeng",
            jenjang: "Sekolah Dasar",
        },
    ];

    const [filteredSiswa, setFilteredSiswa] = useState([...siswa]);

    const handleSearch = (event) => {
        let value = event.target.value;

        setFormPendaftaran({
            ...formPendaftaran,
            nama_siswa: value,
        });

        if (!value) {
            setFilteredSiswa([...siswa]);
        } else {
            let result = [...siswa].filter(
                (item) =>
                    item.nama.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
            setFilteredSiswa(result);
        }
    };

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
                    Pendaftaran Siswa
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
                            <div className="row mb-6">
                                <div className="title mb-1">
                                    <p>Cari Siswa</p>
                                </div>
                                <div className="input-field relative">
                                    <input
                                        type="text"
                                        name="nama_siswa"
                                        id="nama_siswa"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Bambang Anak Pak Budi"
                                        onChange={(e) => {
                                            handleSearch(e);
                                        }}
                                        value={formPendaftaran.nama_siswa}
                                    />
                                    <div className="absolute bottom-0 right-0 w-8 h-full flex items-center cursor-pointer">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                                <div className="result-search w-full h-48 border-x border-b border-abu-bs rounded-md p-2 pt-0 overflow-auto">
                                    <h1 className="font-semibold sticky top-0 left-0 backdrop-blur-sm py-2 bg-white/30">
                                        Nama Siswa
                                    </h1>
                                    <ul>
                                        {filteredSiswa.length ? (
                                            filteredSiswa.map((item) => (
                                                <li
                                                    className="p-2 hover:bg-merah-bs hover:text-white hover:rounded-md border-b border-abu-bs"
                                                    onClick={() =>
                                                        setFormPendaftaran({
                                                            ...formPendaftaran,
                                                            nama_siswa:
                                                                item.nama,
                                                        })
                                                    }
                                                >
                                                    {`${item.nama} - ${item.asal_sekolah}`}
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

                            <div className="row mb-3 flex gap-2">
                                <div className="row mb-3 w-1/3">
                                    <div className="title mb-1">
                                        <p>Jenjang</p>
                                    </div>
                                    <div className="input-field">
                                        <select
                                            name="jenjang"
                                            id="jenjang"
                                            disabled="disabled"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                        >
                                            <option value="">
                                                Sekolah Dasar
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3 w-2/3">
                                    <div className="title mb-1">
                                        <p>Pilihan Paket Bimbingan Belajar</p>
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
                                            <option value="reguler">
                                                Sekolah Dasar - Bimbingan
                                                Reguler
                                            </option>
                                            <option value="private">
                                                Sekolah Dasar - Bimbingan
                                                Private
                                            </option>
                                            <option value="intensive">
                                                Sekolah Dasar - Bimbingan
                                                Intensive
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-6">
                                <div className="title mb-1">
                                    <p>Total Pembayaran</p>
                                </div>
                                <div className="input-field relative">
                                    <input
                                        type="text"
                                        name="pembayaran"
                                        id="pembayaran"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        disabled
                                        value={0}
                                    />
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
