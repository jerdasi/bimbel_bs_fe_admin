import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./SmartComponent/Table";
import FormPendaftaran from "./FormPendaftaran";
import { DataGrid } from "@mui/x-data-grid";

export default function TablePendaftaran() {
    const [dataPendaftaran, setDataPendaftaran] = useState([]);
    const [pendaftar, setPendaftar] = useState({});
    const [jenjang, setJenjang] = useState([]);
    const [siswa, setSiswa] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/pendaftaran`).then((res) => {
            setDataPendaftaran([...res.data.data]);
        });
        axios
            .get(`${process.env.REACT_APP_API}/jenjang-pendidikan`)
            .then((res) => setJenjang([...res.data.data]));
        axios.get(`${process.env.REACT_APP_API}/peserta-didik`).then((res) => {
            setSiswa([...res.data.data]);
        });
        console.log("Use Effect Parent Jalan");
    }, []);

    const columns = [
        {
            field: "NamaSiswa",
            headerName: "Nama Siswa",
            width: 200,
            valueGetter: (params) => {
                return siswa.filter((s) => s.id == params.row.id_siswa)[0]
                    ?.nama;
            },
        },
        {
            field: "Jenjang",
            headerName: "Jenjang Pendidikan",
            width: 120,
            valueGetter: (params) => {
                return jenjang.filter((j) => j.id == params.row.id_jenjang)[0]
                    ?.nama_jenjang;
            },
        },
        { field: "NamaPaket", headerName: "Nama Paket", width: 150 },
        { field: "NamaGrup", headerName: "Nama Grup", width: 150 },
        {
            field: "TanggalPendaftaran",
            headerName: "Tanggal Pendaftaran",
            width: 150,
        },
        {
            field: "TotalPembayaran",
            headerName: "Total Pembayaran",
            width: 150,
        },
        {
            field: "status",
            headerName: "Status",
            width: 80,
            renderCell: (params) => {
                if (params.row.status == "pending") {
                    return (
                        <span className="text-merah-bs">
                            {params.row.status}
                        </span>
                    );
                } else if (params.row.status == "expire") {
                    return (
                        <span className="text-abu-bs">{params.row.status}</span>
                    );
                } else {
                    return (
                        <span className="text-black">{params.row.status}</span>
                    );
                }
            },
        },
        {
            field: "Action",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="w-full h-fit flex justify-center gap-3">
                        <button
                            className="p-2 border border-black rounded-md w-fit"
                            // onClick={(e) => updateGuru(params.row.id_guru)}
                        >
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                            className="p-2 bg-merah-bs text-white rounded-md border border-merah-bs w-fit"
                            // onClick={(e) => hapusGuru(params.row.id_guru)}
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                );
            },
        },
    ];

    const convertToDataTable = (data) => {
        return data.map((item, index) => {
            return {
                id: index,
                id_pendaftaran: item.id,
                id_siswa: item.id_siswa,
                id_jenjang: item.id_jenjang,
                NamaPaket: item.nama_paket,
                NamaGrup: item.nama_grup,
                TanggalPendaftaran: item.tanggal_pendaftaran,
                TotalPembayaran: item.total_pembayaran,
                status: item.status,
            };
        });
    };
    const rows = [];

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
                <div className="w-full h-[75vh]">
                    <DataGrid
                        rows={convertToDataTable(dataPendaftaran)}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection={false}
                        pagination
                        sx={{
                            border: "none",
                            "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: "bold",
                            },
                        }}
                    />
                </div>
                <FormPendaftaran />
            </div>
        </>
    );
}
