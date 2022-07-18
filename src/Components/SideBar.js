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

            <div className="w-full h-full md:mt-8 list-menu flex md:flex-col justify-center md:justify-start md:gap-4 md:overflow-y-auto hide-scrollbar">
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
                                Kelola Peserta Didik
                            </Link>
                        </li>
                        <li
                            className="md:border border-black md:bg-white hover:bg-merah-bs text-black hover:text-white py-3 px-4 md:p-3 rounded-md flex items-center justify-center md:block"
                            onClick={() => handleNavigatePage(`/kelola-guru`)}
                        >
                            <i class="fas fa-person text-2xl md:text-lg md:mr-2"></i>
                            <Link
                                to="/kelola-guru"
                                className="hidden md:inline"
                            >
                                Kelola Guru
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
                        <li
                            className="md:border border-black md:bg-white hover:bg-merah-bs text-black hover:text-white py-3 px-4 md:p-3 rounded-md flex items-center justify-center md:block"
                            onClick={() =>
                                handleNavigatePage(`/kelola-absensi`)
                            }
                        >
                            <i className="fa-solid fa-calendar-days text-2xl md:text-lg md:mr-2"></i>
                            <Link
                                to="/kelola-paket"
                                className="hidden md:inline"
                            >
                                Absensi
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
        </div>
    );
}
