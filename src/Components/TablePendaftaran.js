import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./SmartComponent/Table";
import FormPendaftaran from "./FormPendaftaran";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import moment from "moment";
import * as XLSX from "xlsx";

export default function TablePendaftaran() {
    const [dataPendaftaran, setDataPendaftaran] = useState([]);
    const [show, setShow] = useState(false);
    const [pendaftar, setPendaftar] = useState({});
    const [jenjang, setJenjang] = useState([]);
    const [siswa, setSiswa] = useState([]);
    const [start, setStart] = useState(moment().format());
    const [finish, setFinish] = useState(moment().format());

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
                            onClick={(e) =>
                                updatePendaftaran(params.row.id_pendaftaran)
                            }
                        >
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                            className="p-2 bg-merah-bs text-white rounded-md border border-merah-bs w-fit"
                            onClick={(e) =>
                                hapusPendaftaran(params.row.id_pendaftaran)
                            }
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
                TanggalPendaftaran: moment(item.tanggal_pendaftaran).format(
                    "DD-MM-YYYY"
                ),
                TotalPembayaran: item.total_pembayaran,
                status: item.status,
            };
        });
    };

    const handleOnExport = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: `Kamu akan mendownload laporan dengan rentang dari ${moment(
                start
            ).format("yyyy-MM-DD")} hingga ${moment(finish).format(
                "yyyy-MM-DD"
            )}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Ga AH, Saya Ga Yakin ",
        }).then((result) => {
            if (result.isConfirmed) {
                let dataCetak = [...dataPendaftaran];
                console.log(dataCetak);
                dataCetak = dataCetak.filter(
                    (item) =>
                        moment(item.tanggal_pendaftaran).format() >=
                            moment(start).format() &&
                        moment(item.tanggal_pendaftaran).format() <=
                            moment(finish).format()
                );
                console.log(dataCetak);

                let wb = XLSX.utils.book_new();
                let ws = XLSX.utils.json_to_sheet(
                    convertToDataTable(dataCetak)
                );

                XLSX.utils.book_append_sheet(
                    wb,
                    ws,
                    `PendaftaranBS${new Date().toISOString().split("T")[0]}`
                );
                XLSX.writeFile(
                    wb,
                    `PendaftaranBS${
                        new Date().toISOString().split(".")[0]
                    }.xlsx`
                );
            }
        });
    };

    const updatePendaftaran = (id) => {
        setShow(!show);
        // console.log(dataPendaftaran.filter((item) => item.id == id)[0]);
        setPendaftar(dataPendaftaran.filter((item) => item.id == id)[0]);
    };

    const hapusPendaftaran = (id) => {
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan menghapus pendaftaran ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Ga AH, Saya Ga Yakin ",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${process.env.REACT_APP_API}/pendaftaran/${id}`)
                    .then((res) => {
                        setDataPendaftaran(
                            dataPendaftaran.filter(
                                (item) => item.id != res.data.data.id
                            )
                        );
                        Swal.fire(
                            "Berhasil",
                            "Berhasil Menghapus Pendaftaran!",
                            "success"
                        );
                    });
            }
        });
    };

    return (
        <>
            <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col">
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
                                value={moment(start).format("yyyy-MM-DD")}
                                onChange={(e) => {
                                    if (
                                        moment(e.target.value).format() >
                                        moment(finish).format()
                                    ) {
                                        setStart(finish);
                                        Swal.fire(
                                            "Gagal",
                                            "Tanggal Awal Tidak Boleh Melewati Tanggal Akhir",
                                            "warning"
                                        );
                                    } else {
                                        setStart(
                                            moment(e.target.value).format()
                                        );
                                    }
                                }}
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
                                value={moment(finish).format("yyyy-MM-DD")}
                                onChange={(e) => {
                                    if (
                                        moment(e.target.value).format() <
                                        moment(finish).format()
                                    ) {
                                        setFinish(start);
                                        Swal.fire(
                                            "Gagal",
                                            "Tanggal Awal Tidak Boleh Melewati Tanggal Akhir",
                                            "warning"
                                        );
                                    } else {
                                        setFinish(
                                            moment(e.target.value).format()
                                        );
                                    }
                                }}
                                className="h-full border border-abu-bs rounded-md px-2 py-1 w-3/4"
                            />
                        </div>

                        <button
                            className="w-full border border-abu-bs rounded-md hover:bg-merah-bs hover:text-white ml-0 md:ml-4 p-2"
                            onClick={handleOnExport}
                        >
                            Cetak Laporan
                        </button>
                    </div>
                </div>
                <div className="w-full h-[65vh]">
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
                <FormPendaftaran
                    setDataPendaftaran={setDataPendaftaran}
                    dataPendaftaran={dataPendaftaran}
                    pendaftar={pendaftar}
                    setPendaftar={setPendaftar}
                    show={show}
                    setShow={setShow}
                />
            </div>
        </>
    );
}
