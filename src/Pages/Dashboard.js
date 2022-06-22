import React from "react";
import SideBar from "../Components/SideBar";
import Summary from "../Components/Summary";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    CategoryScale,
    registerables,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import "swiper/css";
import "swiper/css/pagination";
import "../index.css";

ChartJS.register(...registerables);
const Dashboard = () => {
    return (
        <div className="w-full md:w-screen md:h-screen md:flex p-2 md:p-0">
            <SideBar />
            {/* <Summary /> */}
            <div className="w-full">
                <h1 className="text-2xl font-bold">
                    <span className="text-merah-bs">Quality</span> More Than{" "}
                    <span className="text-merah-bs">Quantity</span>
                </h1>
                <div className="summary-wrapper my-4 w-full">
                    <div className="analytic-wrapper h-96 flex flex-col mb-4">
                        <h1 className="text-lg md:text-lg font-semibold text-merah-bs">
                            Riwayat Pendaftaran
                        </h1>
                        <p className="text-sm">1012 Pendaftaran Terjadi</p>
                        <div className="h-full p-2">
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
                                    datasets: [
                                        {
                                            label: "# Pendaftar SD",
                                            data: [
                                                12, 19, 3, 5, 2, 3, 12, 19, 3,
                                                5, 2, 3,
                                            ],
                                            borderColor: "red",
                                            backgroundColor: "red",
                                        },
                                        {
                                            label: "# Pendaftar SMP",
                                            data: [
                                                19, 3, 5, 2, 3, 12, 19, 3, 5, 2,
                                                3, 10,
                                            ],
                                            borderColor: "aqua",
                                            backgroundColor: "aqua",
                                        },
                                    ],
                                }}
                                height={200}
                                width={400}
                                options={{
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                    <div className="jenjang-wrapper h-48 flex flex-col mb-4">
                        <h1 className="text-lg md:text-lg font-semibold text-merah-bs">
                            Jenjang Pendidikan
                        </h1>
                        <p className="text-sm">
                            5 Jenjang Pendidikan Terdaftar
                        </p>
                        <div className="h-full flex flex-wrap gap-2 overflow-y-auto mt-3">
                            <div className="jenjang-item w-[30%] h-[70%] border border-black rounded-md p-2 bg-biru-bs flex flex-col justify-center text-center">
                                <h1 className="text-sm font-medium">
                                    Belum Sekolah
                                </h1>
                                <p className="text-2xl font-bold text-merah-bs">
                                    40
                                    <span className="hidden">
                                        Siswa Terdaftar
                                    </span>
                                </p>
                            </div>
                            <div className="jenjang-item w-[30%] h-[70%] border border-black rounded-md p-2 bg-biru-bs flex flex-col justify-center text-center">
                                <h1 className="text-sm font-medium">
                                    Belum Sekolah
                                </h1>
                                <p className="text-2xl font-bold text-merah-bs">
                                    40
                                    <span className="hidden">
                                        Siswa Terdaftar
                                    </span>
                                </p>
                            </div>
                            <div className="jenjang-item w-[30%] h-[70%] border border-black rounded-md p-2 bg-biru-bs flex flex-col justify-center text-center">
                                <h1 className="text-sm font-medium">
                                    Belum Sekolah
                                </h1>
                                <p className="text-2xl font-bold text-merah-bs">
                                    40
                                    <span className="hidden">
                                        Siswa Terdaftar
                                    </span>
                                </p>
                            </div>
                            <div className="jenjang-item w-[30%] h-[70%] border border-black rounded-md p-2 bg-biru-bs flex flex-col justify-center text-center">
                                <h1 className="text-sm font-medium">
                                    Belum Sekolah
                                </h1>
                                <p className="text-2xl font-bold text-merah-bs">
                                    40
                                    <span className="hidden">
                                        Siswa Terdaftar
                                    </span>
                                </p>
                            </div>
                            <div className="jenjang-item w-[30%] h-[70%] border border-black rounded-md p-2 bg-biru-bs flex flex-col justify-center text-center">
                                <h1 className="text-sm font-medium">
                                    Belum Sekolah
                                </h1>
                                <p className="text-2xl font-bold text-merah-bs">
                                    40
                                    <span className="hidden">
                                        Siswa Terdaftar
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/4 h-96 flex flex-col">
                <h1 className="text-lg md:text-lg font-semibold text-merah-bs">
                    Paket Bimbingan
                </h1>
                <p className="text-sm">12 Paket Bimbingan Terdaftar</p>
                <div className="paket-wrapper h-full border-b border-biru-bs mt-3 overflow-y-auto">
                    <div className="item flex items-center gap-4 border border-black rounded-md p-1 mb-2 group hover:bg-biru-bs">
                        <img
                            src="./images/product-img.jpg"
                            alt=""
                            className="w-1/4"
                        />
                        <div className="item-description w-full">
                            <h2 className="font-semibold">
                                Paket Regular - Sekolah Dasar
                            </h2>
                            <p>
                                Total Siswa{" "}
                                <span className="text-merah-bs font-semibold">
                                    42 Orang
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="item flex items-center gap-4 border border-black rounded-md p-1 mb-2 group hover:bg-biru-bs">
                        <img
                            src="./images/product-img.jpg"
                            alt=""
                            className="w-1/4"
                        />
                        <div className="item-description w-full">
                            <h2 className="font-semibold">
                                Paket Regular - Sekolah Dasar
                            </h2>
                            <p>
                                Total Siswa{" "}
                                <span className="text-merah-bs font-semibold">
                                    42 Orang
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="item flex items-center gap-4 border border-black rounded-md p-1 mb-2 group hover:bg-biru-bs">
                        <img
                            src="./images/product-img.jpg"
                            alt=""
                            className="w-1/4"
                        />
                        <div className="item-description w-full">
                            <h2 className="font-semibold">
                                Paket Regular - Sekolah Dasar
                            </h2>
                            <p>
                                Total Siswa{" "}
                                <span className="text-merah-bs font-semibold">
                                    42 Orang
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="item flex items-center gap-4 border border-black rounded-md p-1 mb-2 group hover:bg-biru-bs">
                        <img
                            src="./images/product-img.jpg"
                            alt=""
                            className="w-1/4"
                        />
                        <div className="item-description w-full">
                            <h2 className="font-semibold">
                                Paket Regular - Sekolah Dasar
                            </h2>
                            <p>
                                Total Siswa{" "}
                                <span className="text-merah-bs font-semibold">
                                    42 Orang
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="item flex items-center gap-4 border border-black rounded-md p-1 mb-2 group hover:bg-biru-bs">
                        <img
                            src="./images/product-img.jpg"
                            alt=""
                            className="w-1/4"
                        />
                        <div className="item-description w-full">
                            <h2 className="font-semibold">
                                Paket Regular - Sekolah Dasar
                            </h2>
                            <p>
                                Total Siswa{" "}
                                <span className="text-merah-bs font-semibold">
                                    42 Orang
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
