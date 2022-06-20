import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  registerables,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
// import { Chart, Bar }            from 'react-chartjs-2'
// import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

export default function Summary() {
  const [paket, setPaket] = useState(["Dog", "Bird", "Cat", "Mouse", "Horse"]);
  return (
    <div className="w-4/5 h-full flex p-4 gap-6">
      <div className="basis-4/6 flex flex-col justify-between gap-4">
        <section className="siswa h-1/2 w-full flex flex-col border border-black ">
          <h1 className="text-xl font-bold py-2 pl-2 text-white bg-merah-bs">
            Siswa Terdaftar
          </h1>
          <div className="w-full flex flex-wrap justify-between basis-full overflow-y-auto p-2">
            <div className="w-[30%] h-5/6 border border-black rounded-lg mb-8 p-2 flex flex-col justify-between">
              <img
                src="/images/lesson.png"
                alt="logo-paket"
                className="h-[75%] mx-auto"
              />
              <div className="description">
                <h1 className="font-bold text-lg">Sekolah Dasar</h1>
                <h1>40 Siswa Terdaftar</h1>
              </div>
            </div>
            <div className="w-[30%] h-5/6 border border-black rounded-lg mb-8 p-2 flex flex-col justify-between">
              <img
                src="/images/lesson.png"
                alt="logo-paket"
                className="h-[75%] mx-auto"
              />
              <div className="description">
                <h1 className="font-bold text-lg">Sekolah Dasar</h1>
                <h1>40 Siswa Terdaftar</h1>
              </div>
            </div>
            <div className="w-[30%] h-5/6 border border-black rounded-lg mb-8 p-2 flex flex-col justify-between">
              <img
                src="/images/lesson.png"
                alt="logo-paket"
                className="h-[75%] mx-auto"
              />
              <div className="description">
                <h1 className="font-bold text-lg">Sekolah Dasar</h1>
                <h1>40 Siswa Terdaftar</h1>
              </div>
            </div>
            <div className="w-[30%] h-5/6 border border-black rounded-lg mb-8 p-2 flex flex-col justify-between">
              <img
                src="/images/lesson.png"
                alt="logo-paket"
                className="h-[75%] mx-auto"
              />
              <div className="description">
                <h1 className="font-bold text-lg">Sekolah Dasar</h1>
                <h1>40 Siswa Terdaftar</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="transaction h-1/2 w-full lex flex-col border border-black ">
          <h1 className="text-xl font-bold py-2 pl-2 text-white bg-merah-bs">
            Riwayat Pendaftaran
          </h1>
          <div className="w-full">
            <div className="h-full w-full p-2">
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
                      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                      borderColor: "red",
                      backgroundColor: "red",
                    },
                    {
                      label: "# Pendaftar SMP",
                      data: [19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 10],
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
        </section>
      </div>
      <div className="basis-2/6 border border-black flex flex-col">
        <h1 className="text-xl font-bold py-2 pl-2 bg-merah-bs text-white mb-2">
          Paket Bimbingan Belajar
        </h1>
        <div className="w-full basis-full rounded-lg overflow-y-auto px-2 last:pb-0">
          {paket.map((item) => (
            <div className="w-full h-24 border border-black mb-4 flex p-2 rounded-lg group hover:bg-merah-bs hover:cursor-pointer">
              <div className="w-1/3">
                <img
                  src="/images/lesson-product.png"
                  alt=""
                  className="h-full"
                />
              </div>
              <div className="description w-2/3">
                <h2 className="font-bold text-md group-hover:text-white">
                  Paket Reguler - Sekolah Dasar
                </h2>
                <p className="text-sm group-hover:text-white">
                  Total Siswa
                  <span className="font-bold text-merah-bs group-hover:text-white">
                    42 orang
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
