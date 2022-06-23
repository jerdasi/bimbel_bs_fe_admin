import React from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();

    const handleNavigatePage = (link) => {
        navigate(link);
    };

    const handleLogOut = (event) => {
        event.preventDefault();
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan logout dari akun ini",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Ga AH, Saya Ga Yakin ",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "Logout Berhaasil!",
                    "Silahkan Login Kembali",
                    "success"
                );
                navigate("/");
            }
        });
    };
    return (
        <div className="w-full md:w-1/5 h-16 md:h-full fixed md:static left-0 bottom-0 md:p-4 flex flex-col justify-center items-center bg-biru-bs z-10">
            <div className="hidden md:flex w-full h-16 items-center gap-2">
                <img
                    src="images/logo-simbol.png"
                    alt="logo-bimbel"
                    className="h-full w-auto"
                />
                <h1 className="font-bold text-3xl">Beta Smart</h1>
            </div>

            <div className="w-full h-full md:mt-16 list-menu flex md:flex-col justify-center md:justify-start md:gap-4">
                <div className="sub-menu flex md:block items-center">
                    <h3 className="hidden md:block font-light opacity-50">
                        Home
                    </h3>
                    <ul>
                        <li
                            className="w-auto md:border border-black md:bg-white hover:bg-merah-bs text-black hover:text-white py-3 px-4 md:p-3 rounded-md flex items-center justify-center md:block"
                            onClick={() => handleNavigatePage("/dashboard")}
                        >
                            <i class="fas fa-gauge text-2xl md:text-lg md:mr-2"></i>
                            <Link to="/dashboard" className="hidden md:inline">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sub-menu flex md:block items-center">
                    <h3 className="hidden md:block font-light opacity-50">
                        Fitur
                    </h3>
                    <ul className="flex md:flex-col md:gap-1 justify-between">
                        <li
                            className="md:border border-black md:bg-white hover:bg-merah-bs text-black hover:text-white py-3 px-4 md:p-3 rounded-md flex items-center justify-center md:block"
                            onClick={() => handleNavigatePage(`/peserta-didik`)}
                        >
                            <i class="fa-solid fa-graduation-cap text-2xl md:text-lg md:mr-2"></i>
                            <Link
                                to="/peserta-didik"
                                className="hidden md:inline"
                            >
                                Peserta Didik
                            </Link>
                        </li>
                        <li
                            className="md:border border-black md:bg-white hover:bg-merah-bs text-black hover:text-white py-3 px-4 md:p-3 rounded-md flex items-center justify-center md:block"
                            onClick={() =>
                                handleNavigatePage(`/kelola-pendaftaran`)
                            }
                        >
                            <i class="fas fa-chart-line text-2xl md:text-lg md:mr-2"></i>
                            <Link
                                to="/kelola-pendaftaran"
                                className="hidden md:inline"
                            >
                                Kelola Transaksi
                            </Link>
                        </li>
                        <li
                            className="md:border border-black md:bg-white hover:bg-merah-bs text-black hover:text-white py-3 px-4 md:p-3 rounded-md flex items-center justify-center md:block"
                            onClick={() =>
                                handleNavigatePage(`/kelola-testimoni`)
                            }
                        >
                            <i class="fa-solid fa-comment text-2xl md:text-lg md:mr-2"></i>
                            <Link
                                to="/kelola-testimoni"
                                className="hidden md:inline"
                            >
                                Kelola Testimoni
                            </Link>
                        </li>
                        <li
                            className="md:border border-black md:bg-white hover:bg-merah-bs text-black hover:text-white py-3 px-4 md:p-3 rounded-md flex items-center justify-center md:block"
                            onClick={() => handleNavigatePage(`/kelola-paket`)}
                        >
                            <i class="fas fa-chalkboard-teacher text-2xl md:text-lg md:mr-2"></i>
                            <Link
                                to="/kelola-paket"
                                className="hidden md:inline"
                            >
                                Kelola Paket Bimbingan
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sub-menu flex md:block items-center">
                    <h3 className="hidden md:block font-light opacity-50">
                        Akun
                    </h3>
                    <ul>
                        <li
                            className="md:border border-black md:bg-white hover:bg-merah-bs text-black hover:text-white py-3 px-4 md:p-3 rounded-md flex items-center justify-center md:block"
                            onClick={handleLogOut}
                        >
                            <i class="fa-solid fa-arrow-right-from-bracket text-2xl md:text-lg md:mr-2"></i>
                            <a href="" className="hidden md:inline">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <ul className="main-menu">
                <li className="item border-y border-black" id="menu">
                    <a
                        href="#menu"
                        className="block px-2 py-3 relative text-white bg-merah-bs"
                    >
                        <i class="fas fa-tools text-lg mr-2"></i>Menu
                    </a>
                    <div className="overflow-hidden max-h-0 transition-[max-height] duration-500 overflow-y-auto">
                        <Link
                            to="/dashboard"
                            className="px-2 py-3 block hover:bg-merah-bs"
                        >
                            <i class="fas fa-chart-line text-lg mr-2"></i>
                            Dashboard
                        </Link>
                    </div>
                </li>
                <li className="item border-y border-black" id="fitur">
                    <a
                        href="#fitur"
                        className="block px-2 py-3 relative text-white  bg-merah-bs"
                    >
                        <i class="fas fa-tools text-lg mr-2"></i>Fitur
                    </a>
                    <div className="overflow-hidden max-h-0 transition-[max-height] duration-500 overflow-y-auto">
                        <Link
                            to="/peserta-didik"
                            className="px-2 py-3 block hover:bg-merah-bs"
                        >
                            <i class="fa-solid fa-graduation-cap text-lg mr-2"></i>
                            Peserta Didik
                        </Link>
                        <Link
                            to="transaction"
                            className="px-2 py-3 block hover:bg-merah-bs"
                        >
                            <i class="fas fa-chart-line text-lg mr-2"></i>Kelola
                            Transaksi
                        </Link>
                        <Link
                            to="/testimoni"
                            className="px-2 py-3 block hover:bg-merah-bs"
                        >
                            <i class="fa-solid fa-comment text-lg mr-2"></i>
                            Kelola Testimoni
                        </Link>
                        <Link
                            to="/paket-bimbingan"
                            className="px-2 py-3 block hover:bg-merah-bs"
                        >
                            <i class="fas fa-chalkboard-teacher text-lg mr-2"></i>
                            Kelola Paket Bimbingan
                        </Link>
                    </div>
                </li>
                <li className="item border-y border-black">
                    <a
                        href=""
                        className="block px-2 py-3 relative bg-merah-bs text-white"
                        onClick={LogOut}
                    >
                        <i class="fa-solid fa-arrow-right-from-bracket text-lg mr-2"></i>
                        Keluar
                    </a>
                </li>
            </ul> */}
        </div>
    );
}
