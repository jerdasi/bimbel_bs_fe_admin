import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./SmartComponent/Table";

export default function TableSiswa() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/peserta-didik").then((res) => {
            setUser([...res.data.data])
        });
        console.log("Use Effect Parent Jalan");
    }, []);

    return (
        <>
            <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col md:justify-center">
                <h1 className="text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                    Kelola Data Peserta Didik
                </h1>
                <div className="h-full md:h-full overflow-auto">
                    <Table
                        sumber={user}
                        judulTabel={[
                            "No",
                            "Nama",
                            "Tempat / Tanggal Lahir",
                            "Asal Sekolah",
                            "Alamat",
                            "Foto",
                            "Nama Ayah",
                            "Nama Ibu",
                            "Telepon Anak",
                            "Telepon Ayah",
                            "Telepon Ibu",
                            "Status"
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
