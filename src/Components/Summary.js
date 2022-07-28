import React, { useState } from "react";
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    CategoryScale,
    registerables,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

ChartJS.register(...registerables);

export default function Summary() {
    const [paket, setPaket] = useState([]);

    const [jumlahPerJenjang, setJumlahPerJenjang] = useState([]);
    const [jumlahPerPaket, setJumlahPerPaket] = useState([]);
    const [pendaftaran, setPendaftaran] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Tes");
        axios
            .get(`${process.env.REACT_APP_API}/pendaftaran/pendaftaran-jenjang`)
            .then((res) => setJumlahPerJenjang(res.data.data));
        axios
            .get(`${process.env.REACT_APP_API}/pendaftaran/pendaftaran-paket`)
            .then((res) => setJumlahPerPaket(res.data.data));
        axios
            .get(`${process.env.REACT_APP_API}/pendaftaran/pendaftaran-sukses`)
            .then((res) => console.log(res.data.data));
        axios
            .get(
                `${process.env.REACT_APP_API}/pendaftaran/pendaftaran-semua?tahun=2022`
            )
            .then((res) => {
                // Membuat Data Graph
                let label = [
                    ...new Set(res.data.data.map((item) => item.nama_jenjang)),
                ];
                setTotal(
                    res.data.data.reduce(function (acc, cur) {
                        return acc + cur.jumlah;
                    }, 0)
                );
                setPendaftaran(
                    label.map((item) => {
                        let jumlah = Array(12).fill(0);
                        let warna =
                            "#" +
                            (0x1000000 + Math.random() * 0xffffff)
                                .toString(16)
                                .substr(1, 6);
                        res.data.data
                            .filter((d) => d.nama_jenjang == item)
                            .map((d) => (jumlah[d.bulan - 1] = d.jumlah));
                        return {
                            label: item,
                            data: jumlah,
                            borderColor: warna,
                            backgroundColor: warna,
                        };
                    })
                );
                // let sekolah_dasar = Array(12).fill(0);
                // res.data.data
                //     .filter((item) => item.nama_jenjang == "Sekolah Dasar")
                //     .map(
                //         (item) => (sekolah_dasar[item.bulan - 1] = item.jumlah)
                //     );
                // console.log(sekolah_dasar);
                // console.log(label);
            });
    }, []);

    return (
        <div className="w-full md:w-4/5 md:px-6 md:py-2 md:flex md:gap-6">
            <div className="w-full md:w-[70%] h-full md:flex md:flex-col">
                <div className="flex gap-4 items-center md:h-[10%]">
                    <img
                        src="./images/logo-bs.png"
                        alt=""
                        className="h-12 md:hidden"
                    />
                    <h1 className="hidden md:block text-3xl font-bold w-1/2 md:w-full">
                        <span className="text-merah-bs">Quality</span> More Than{" "}
                        <span className="text-merah-bs">Quantity</span>
                    </h1>
                </div>
                <div className="summary-wrapper my-4 md:mt-0 w-full md:h-[90%] mb-4 md:flex md:flex-col-reverse">
                    {/* Chart */}
                    <div className="analytic-wrapper h-96 md:h-1/2 flex flex-col mb-4 border-t border-biru-bs pt-4">
                        <h1 className="text-2xl font-semibold text-merah-bs">
                            Riwayat Pendaftaran
                        </h1>
                        <p className="text-sm">{total} Pendaftaran Terjadi</p>
                        <div className="h-full p-2 md:p-0">
                            <Line
                                data={{
                                    labels: [
                                        "Jan",
                                        "Feb",
                                        "Mar",
                                        "Apr",
                                        "May",
                                        "Jun",
                                        "Jul",
                                        "Aug",
                                        "Sept",
                                        "Oct",
                                        "Nov",
                                        "Dec",
                                    ],
                                    datasets: [...pendaftaran],
                                }}
                                height={200}
                                width={400}
                                options={{
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                    {/* Jenjang */}
                    <div className="jenjang-wrapper h-48 md:h-1/2 flex flex-col mb-4 border-t border-biru-bs pt-4">
                        <h1 className="text-2xl font-semibold text-merah-bs">
                            Jenjang Pendidikan
                        </h1>
                        <p className="text-sm">
                            {jumlahPerJenjang.length} Jenjang Pendidikan
                            Terdaftar
                        </p>
                        <div className="h-full flex flex-wrap gap-2 overflow-y-auto mt-3 overflow-hidden hide-scrollbar">
                            {jumlahPerJenjang.map((item) => (
                                <div
                                    className="jenjang-item w-[30%] h-[90%] border border-black rounded-md p-4 md:p-0 bg-biru-bs md:bg-white flex flex-col justify-between items-center text-center overflow-hidden"
                                    onClick={(e) => navigate("/kelola-paket")}
                                >
                                    <div className="hidden md:block jenjang-img md:py-2 md:h-2/3">
                                        <img
                                            src="./images/logo-jenjang.png"
                                            alt=""
                                            className="h-full w-auto"
                                        />
                                    </div>
                                    <div className="jenjang-description w-full md:h-1/2 md:bg-merah-bs md:text-white md:p-2 md:flex md:items-center">
                                        <div className="w-3/4 text-center mx-auto md:mx-0">
                                            <h1 className="text-sm md:text-base font-medium md:font-bold md:text-left">
                                                {item.nama_jenjang}
                                            </h1>
                                            <p className="text-2xl md:text-base font-bold md:font-normal text-merah-bs md:text-white md:text-left">
                                                {item.total}{" "}
                                                <span className="hidden md:inline">
                                                    Siswa Terdaftar
                                                </span>
                                            </p>
                                        </div>
                                        <div className="w-1/4 hidden md:block">
                                            <i class="fa-solid fa-circle-arrow-right text-2xl"></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[30%] h-96 md:h-full flex flex-col border-t border-biru-bs pt-4">
                <h1 className="text-2xl font-semibold text-merah-bs">
                    Paket Bimbingan
                </h1>
                <p className="text-sm">
                    {jumlahPerPaket.length} Paket Bimbingan Terdaftar
                </p>
                <div className="paket-wrapper h-full border-b border-biru-bs mt-3 overflow-y-auto">
                    {jumlahPerPaket.map((item) => (
                        <div
                            className="item flex items-center gap-4 border border-black rounded-md p-1 mb-2 group hover:bg-biru-bs hover:cursor-pointer"
                            onClick={(e) => navigate("/kelola-paket")}
                        >
                            <img
                                src="./images/product-img.jpg"
                                alt=""
                                className="w-1/4"
                            />
                            <div className="item-description w-full">
                                <h2 className="font-semibold">
                                    {item.nama_paket} - {item.nama_jenjang}
                                </h2>
                                <p>
                                    Total Siswa{" "}
                                    <span className="text-merah-bs font-semibold">
                                        {item.total} Orang
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
