import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./SmartComponent/Table";

export default function TablePendaftaran() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
            setUser([...res.data]);
        });
        console.log("Use Effect Parent Jalan");
    }, []);

    return (
        <>
            <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col md:justify-center">
                <h1 className="text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                    Kelola Transaksi
                </h1>
                <div className="flex justify-start md:justify-end w-full my-4">
                    <div className="tool-cetak w-full md:w-2/3 flex flex-col md:flex-row items-center gap-2">
                        <div className="w-full h-full flex gap-2 items-center">
                            <label htmlFor="start_laporan" className="w-1/4">
                                Awal :
                            </label>
                            <input
                                type="date"
                                name="start_laporan"
                                id="start_laporan"
                                className="h-full border border-abu-bs rounded-md px-2 py-1 w-3/4"
                            />
                        </div>
                        <div className="w-full h-full flex gap-2 items-center">
                            <label htmlFor="end" className="w-1/4">
                                Akhir :
                            </label>
                            <input
                                type="date"
                                name="end_laporan"
                                id="end_laporan"
                                className="h-full border border-abu-bs rounded-md px-2 py-1 w-3/4"
                            />
                        </div>

                        <button className="w-full border border-abu-bs rounded-md hover:bg-merah-bs hover:text-white ml-0 md:ml-4 p-2">
                            Cetak Laporan
                        </button>
                    </div>
                </div>
                <div className="h-full md:h-full overflow-auto">
                    <Table
                        sumber={user}
                        judulTabel={[
                            "No",
                            "Nama Siswa",
                            "Nama Paket",
                            "Tanggal Pendaftaran",
                            "Total Pembayaran",
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
