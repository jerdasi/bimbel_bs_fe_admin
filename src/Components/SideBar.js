import React from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const LogOut = (event) => {
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
        Swal.fire("Logout Berhaasil!", "Silahkan Login Kembali", "success");
        navigate("/");
      }
    });
  };
  return (
    <div className="w-1/5 h-full border border-black">
      <img
        src="images/logo-simbol.png"
        alt="logo-bimbel"
        className="h-16 w-auto m-4"
      />
      <ul className="main-menu">
        <li className="item border-y border-black" id="menu">
          <a
            href="#menu"
            className="block px-2 py-3 relative text-white bg-merah-bs"
          >
            <i class="fas fa-tools text-lg mr-2"></i>Menu
          </a>
          <div className="overflow-hidden max-h-0 transition-[max-height] duration-500 overflow-y-auto">
            <Link to="/dashboard" className="px-2 py-3 block hover:bg-merah-bs">
              <i class="fas fa-chart-line text-lg mr-2"></i>Dashboard
            </Link>
          </div>
        </li>
        <li className="item border-y border-black" id="fitur">
          <a
            href=""
            className="block px-2 py-3 relative text-white  bg-merah-bs"
          >
            <i class="fas fa-tools text-lg mr-2"></i>Fitur
          </a>
          <div className="overflow-hidden max-h-0 transition-[max-height] duration-500 overflow-y-auto">
            <Link
              to="/peserta-didik"
              className="px-2 py-3 block hover:bg-merah-bs"
            >
              <i class="fa-solid fa-graduation-cap text-lg mr-2"></i>Peserta
              Didik
            </Link>
            <Link
              to="transaction"
              className="px-2 py-3 block hover:bg-merah-bs"
            >
              <i class="fas fa-chart-line text-lg mr-2"></i>Kelola Transaksi
            </Link>
            <Link to="/testimoni" className="px-2 py-3 block hover:bg-merah-bs">
              <i class="fa-solid fa-comment text-lg mr-2"></i>Kelola Testimoni
            </Link>
            <Link
              to="/paket-bimbingan"
              className="px-2 py-3 block hover:bg-merah-bs"
            >
              <i class="fas fa-chalkboard-teacher text-lg mr-2"></i>Kelola Paket
              Bimbingan
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
      </ul>
    </div>
  );
}
