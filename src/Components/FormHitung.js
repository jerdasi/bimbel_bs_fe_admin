import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "autoprefixer";
import Swal from "sweetalert2";
import Loader from "./SmartComponent/Loader";
// import { useEffect } from "react";

export default function FormHitung({ show, setShow, filterAbsensi, detail }) {
    const [status, setStatus] = useState(false);
    const [harga, setHarga] = useState([]);

    const [paket, setPaket] = useState([]);
    const [jenjang, setJenjang] = useState([]);

    const handleShow = () => {
        setShow(!show);
    };

    const hitungGaji = (e) => {
        e.preventDefault();
        let total = 0;
        detail.absen_guru.forEach((item, index) => {
            total += item.total_jam * harga[index];
        });
        Swal.fire("Selamat!", `Gaji ${detail.nama_guru} adalah Rp. ${total}`);
        setShow(!show);
        console.log(total);
    };

    // Use Effect
    useEffect(() => {
        console.log(detail.absen_guru);
        setHarga(Array(detail.absen_guru?.length).fill(0));
    }, [detail]);

    return (
        <div className="">
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
                                Hitung Gaji Guru
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={handleShow}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            <div className="row font-bold md:flex">
                                <div className="title mb-1 w-full md:w-1/2">
                                    <p>Nama</p>
                                </div>
                                <div className="input-field w-full md:w-1/2">
                                    <p>: {detail.nama_guru}</p>
                                </div>
                            </div>

                            <div className="row font-bold md:flex">
                                <div className="title mb-1 w-full md:w-1/2">
                                    <p>Perhitungan mulai</p>
                                </div>
                                <div className="input-field w-full md:w-1/2">
                                    <p>
                                        : {detail.tanggal_awal} s/d{" "}
                                        {detail.tanggal_akhir}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-2 pt-2 border-t border-abu-bs">
                                <h1 className="text-xl font-bold text-merah-bs mb-2">
                                    Masukkan Gaji Per Jam
                                </h1>
                                {detail.absen_guru != undefined
                                    ? detail.absen_guru?.length > 0
                                        ? detail.absen_guru?.map(
                                              (item, index) => (
                                                  <div className="row md:flex md:items-center">
                                                      <div className="title mb-1 w-full md:w-1/2">
                                                          <p>
                                                              {item.nama_kelas}{" "}
                                                              <span className="italic text-merah-bs">
                                                                  (
                                                                  {
                                                                      item.total_jam
                                                                  }{" "}
                                                                  jam)
                                                              </span>
                                                          </p>
                                                      </div>
                                                      <div className="input-field w-full md:w-1/2">
                                                          <input
                                                              type="number"
                                                              className="p-2 border border-abu-bs rounded-md w-full"
                                                              value={
                                                                  harga[index]
                                                              }
                                                              placeholder="Input Harga Per Jam"
                                                              onChange={(e) => {
                                                                  let temp_harga =
                                                                      harga;
                                                                  temp_harga[
                                                                      index
                                                                  ] = parseInt(
                                                                      e.target
                                                                          .value
                                                                  );
                                                                  setHarga([
                                                                      ...temp_harga,
                                                                  ]);
                                                              }}
                                                          />
                                                      </div>
                                                  </div>
                                              )
                                          )
                                        : "Tidak ada Riwayat Bekerja"
                                    : "Undefined"}
                            </div>
                            {/* {console.log(detail.absen_guru)} */}

                            {/* {detail != {}
                                ? detail.absen_guru.map((item) => (
                                      <p>
                                          {item.nama_kelas} - {item.total_jam}
                                      </p>
                                  ))
                                : "Nope"} */}
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            <button
                                className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                onClick={hitungGaji}
                            >
                                Hitung
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Loader status={status} />
        </div>
    );
}
