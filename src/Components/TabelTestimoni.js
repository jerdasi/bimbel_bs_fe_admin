import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./SmartComponent/Table";

export default function TabelTestimoni() {
    const [jenjang, setJenjang] = useState([]);
    const [testimoni, setTestimoni] = useState([]);
    const [testimoniFiltered, setTestimoniFiltered] = useState([]);
    const [filterKey, setFilterKey] = useState({
        search: "",
        option: 0,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/jenjang-pendidikan")
            .then((res) => setJenjang(res.data.data));
        axios
            .get("http://localhost:3000/testimoni")
            .then((res) => setTestimoni(res.data.data));
    }, []);

    // Fungsi untuk filter
    const handleFilter = () => {
        console.log(filterKey);
    };

    return (
        <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col">
            <div className="header text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                <h1>Kelola Testimoni</h1>
            </div>
            <div className="h-full flex flex-col overflow-auto">
                <div className="tool-search w-full h-fit md:h-14 p-2 flex md:justify-end">
                    <div className="w-full md:w-3/5 h-full flex flex-col md:flex-row gap-2">
                        <input
                            type="text"
                            name="search_input"
                            id="search_input"
                            className="w-full md:w-2/5 border border-abu-bs rounded-md target:border-merah-bs p-2 md:px-2 md:py-0"
                            placeholder="Cari Testimoni"
                            onChange={(e) =>
                                setFilterKey({
                                    ...filterKey,
                                    search: e.target.value,
                                })
                            }
                            value={filterKey.search}
                        />
                        <select
                            name="jenjang_filter"
                            id="jenjang_filter"
                            className="w-full md:w-2/5 border border-abu-bs rounded-md p-2 md:px-2 md:py-0"
                            onChange={(e) =>
                                setFilterKey({
                                    ...filterKey,
                                    option: parseInt(e.target.value),
                                })
                            }
                            value={filterKey.option}
                        >
                            <option value="0">Semua Jenjang</option>
                            {jenjang.map((item) => (
                                <option value={item.id}>
                                    {item.nama_jenjang}
                                </option>
                            ))}
                        </select>
                        <button
                            className="w-full md:w-1/5 border border-merah-bs hover:bg-merah-bs hover:text-white rounded-md p-2 md:px-2 md:py-0"
                            onClick={handleFilter}
                        >
                            Terapkan
                        </button>
                    </div>
                </div>

                <div className="w-full h-full md:h-full overflow-x-auto">
                    {/* <img
                        src="http://localhost:3000/images/peserta-didik-1656393755762-7358.jpg"
                        alt=""
                    /> */}
                    <table className="w-full overflow-auto collapse">
                        <thead>
                            <tr className="border-b border-abu-bs">
                                <th className="p-2 text-center">No</th>
                                <th className="p-2 text-center">Foto</th>
                                <th className="p-2 text-center">Nama</th>
                                <th className="p-2 text-center">Jenjang</th>
                                <th className="p-2 text-center">Paket</th>
                                <th className="p-2 text-center">Testimoni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimoni.map((item, index) => (
                                <tr className="border-b border-abu-bs h-8 p-2">
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:3000/${item.foto}`}
                                            alt="foto-peserta"
                                            className="h-full"
                                        />
                                    </td>
                                    <td>{item.nama}</td>
                                    <td>{item.id_jenjang}</td>
                                    <td>{item.id_paket}</td>
                                    <td>{item.deskripsi}</td>
                                </tr>
                            ))}
                            {testimoni.map((item, index) => (
                                <tr className="border-b border-abu-bs">
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:3000/${item.foto}`}
                                            alt="foto-peserta"
                                            className="h-full"
                                        />
                                    </td>
                                    <td>{item.nama}</td>
                                    <td>{item.id_jenjang}</td>
                                    <td>{item.id_paket}</td>
                                    <td>{item.deskripsi}</td>
                                </tr>
                            ))}
                            {testimoni.map((item, index) => (
                                <tr className="border-b border-abu-bs">
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:3000/${item.foto}`}
                                            alt="foto-peserta"
                                            className="w-full"
                                        />
                                    </td>
                                    <td>{item.nama}</td>
                                    <td>{item.id_jenjang}</td>
                                    <td>{item.id_paket}</td>
                                    <td>{item.deskripsi}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
