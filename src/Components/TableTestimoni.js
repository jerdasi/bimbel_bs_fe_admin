import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import PreviewPhoto from "./SmartComponent/PreviewPhoto";
import FormGuru from "./FormGuru";
import moment from "moment";
import Swal from "sweetalert2";
import FormTestimoni from "./FormTestimoni";

export default function TableTestimoni() {
    const [siswa, setSiswa] = useState([]);
    const [grup, setGrup] = useState([]);
    const [paket, setPaket] = useState([]);
    const [jenjang, setJenjang] = useState([]);
    const [testimoni, setTestimoni] = useState([]);

    const [guru, setGuru] = useState([]);
    const [singleTestimoni, setSingleTestimoni] = useState({
        id_pendaftaran: 0,
        deskripsi: 0,
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/peserta-didik`).then((res) => {
            setSiswa([...res.data.data]);
        });
        axios.get(`${process.env.REACT_APP_API}/grup-bimbel`).then((res) => {
            setGrup([...res.data.data]);
        });
        axios
            .get(`${process.env.REACT_APP_API}/paket-bimbingan`)
            .then((res) => {
                setPaket([...res.data.data]);
            });
        axios
            .get(`${process.env.REACT_APP_API}/jenjang-pendidikan`)
            .then((res) => {
                setJenjang([...res.data.data]);
            });
        axios.get(`${process.env.REACT_APP_API}/testimoni`).then((res) => {
            setTestimoni([...res.data.data]);
        });
    }, []);

    // handleTambahEditPeserta
    // Id 0 artinya post, selain itu edit/update
    const handleTestimoni = (testimoniBaru, id = 0) => {
        if (id == 0) {
            setTestimoni([...testimoni, convertToDataTable(testimoniBaru)]);
            // console.log(convertToDataTable(testimoniBaru));
        } else {
            let hasil = testimoni.findIndex((item) => item.id == id);
            let tempTestimoni = [...guru];
            tempTestimoni[hasil] = testimoniBaru;
            setGuru([...tempTestimoni]);
        }
    };

    // handleUpdatePeserta
    // Cari dan kirim ke form
    const updateTestimoni = (id) => {
        let testimoni_update = testimoni.find((el) => el.id == id);
        setShowForm(!showForm);
        setSingleTestimoni(testimoni_update);
    };

    // handleHapusTestimoni
    const hapusTestimoni = (id) => {
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan menghapus testimoni ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Ga AH, Saya Ga Yakin ",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${process.env.REACT_APP_API}/testimoni/${id}`)
                    .then((res) =>
                        setTestimoni(
                            testimoni.filter(
                                (item) => item.id != res.data.data.id
                            )
                        )
                    );
            }
        });
    };

    const convertToDataTable = (data) => {
        return data.map((item, index) => {
            return {
                id: index,
                id_siswa: item.id_siswa,
                nama_siswa: siswa.filter((s) => s.id == item.id_siswa)[0]?.nama,
                id_grup: item.id_grup,
                nama_grup: grup.filter((g) => g.id == item.id_grup)[0]
                    ?.nama_grup,
                id_paket: item.id_paket,
                nama_paket: paket.filter((p) => p.id == item.id_paket)[0]
                    ?.nama_paket,
                id_jenjang: item.id_jenjang,
                nama_jenjang: jenjang.filter((j) => j.id == item.id_jenjang)[0]
                    ?.nama_jenjang,
                id_pendaftaran: item.id_pendaftaran,
                deskripsi: item.deskripsi,
            };
        });
    };

    const columns = [
        { field: "nama_siswa", headerName: "Nama Siswa", width: 200 },
        {
            field: "nama_grup",
            headerName: "Nama Grup",
            width: 150,
        },
        {
            field: "nama_paket",
            headerName: "Nama Paket",
            width: 150,
        },
        {
            field: "nama_jenjang",
            headerName: "Nama Jenjang",
            width: 150,
        },
        {
            field: "deskripsi",
            headerName: "Deskripsi",
            width: 250,
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
                                updateTestimoni(params.row.id_testimoni)
                            }
                        >
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                            className="p-2 bg-merah-bs text-white rounded-md border border-merah-bs w-fit"
                            onClick={(e) =>
                                hapusTestimoni(params.row.id_testimoni)
                            }
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col">
                <h1 className="text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                    Kelola Testimoni
                </h1>
                <div className="w-full h-[75vh]">
                    <DataGrid
                        rows={convertToDataTable(testimoni)}
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
            </div>
            <FormTestimoni
                handleTestimoni={handleTestimoni}
                setShowForm={setShowForm}
                showForm={showForm}
                testimoni={testimoni}
                setTestimoni={setTestimoni}
            />
        </>
    );
}
