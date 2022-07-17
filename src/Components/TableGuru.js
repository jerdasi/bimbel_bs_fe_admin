import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import PreviewPhoto from "./SmartComponent/PreviewPhoto";
import FormGuru from "./FormGuru";
import moment from "moment";
import Swal from "sweetalert2";

export default function TableGuru() {
    const [guru, setGuru] = useState([]);
    const [singleGuru, setSingleGuru] = useState({
        nama: "",
        tempat: "",
        tanggal_lahir: moment().format("DD-MM-YYYY"),
        pendidikan_terakhir: "",
        fotoGuru: null,
        alamat: "",
        telepon: "",
        motivasi_mengajar: "",
    });

    const [showPhoto, setShowPhoto] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/guru`).then((res) => {
            setGuru(res.data.data);
            console.log(res.data);
        });
    }, []);

    // handleTambahEditPeserta
    // Id 0 artinya post, selain itu edit/update
    const handleGuru = (pesertaBaru, id = 0) => {
        if (id == 0) {
            setGuru([...guru, pesertaBaru]);
        } else {
            let hasil = guru.findIndex((item) => item.id == id);
            let tempPeserta = [...guru];
            tempPeserta[hasil] = pesertaBaru;
            setGuru([...tempPeserta]);
        }
    };

    // handleUpdatePeserta
    // Cari dan kirim ke form
    const updateGuru = (id) => {
        let guru_update = guru.find((el) => el.id == id);
        setShowForm(!showForm);
        setSingleGuru(guru_update);
    };

    const showFotoGuru = (id) => {
        let guru_update = guru.find((el) => el.id == id);
        setShowPhoto(!showPhoto);
        setSingleGuru(guru_update);
    };

    // handleHapusPeserta
    const hapusGuru = (id) => {
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan menghapus guru ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Ga AH, Saya Ga Yakin ",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${process.env.REACT_APP_API}/guru/${id}`)
                    .then((res) =>
                        setGuru(
                            guru.filter((item) => item.id != res.data.data.id)
                        )
                    );
            }
        });
    };

    const convertToDataTable = (data) => {
        return data.map((item, index) => {
            return {
                id: index,
                id_guru: item.id,
                Nama: item.nama,
                "Tempat/TanggalLahir": `${item.tempat}/${moment(
                    item.tanggal_lahir
                ).format("DD-MM-YYYY")}`,
                PendidikanTerakhir: item.pendidikan_terakhir,
                Foto: item.foto,
                Alamat: item.alamat,
                Telepon: item.telepon,
                MotivasiMengajar: item.motivasi_mengajar,
            };
        });
    };

    const columns = [
        {
            field: "id",
            headerName: "No",
            width: 70,
            renderCell: (params) => {
                return <>{params.value + 1}</>;
            },
        },
        {
            field: "Nama",
            headerName: "Nama",
            width: 250,
            renderCell: (params) => {
                return <b className="uppercase">{params.value}</b>;
            },
        },
        {
            field: "Tempat/TanggalLahir",
            headerName: "Tempat / Tanggal Lahir",
            width: 200,
        },
        {
            field: "PendidikanTerakhir",
            headerName: "Pendidikan Terakhir",
            width: 150,
        },
        {
            field: "Foto",
            headerName: "Foto",
            width: 150,
            renderCell: (params) => {
                return (
                    <img
                        src={`${process.env.REACT_APP_API}/${params.value}`}
                        alt=""
                        onClick={(e) => {
                            showFotoGuru(params.row.id_guru);
                        }}
                    />
                );
            },
        },
        { field: "Alamat", headerName: "Alamat", width: 200 },
        { field: "Telepon", headerName: "Telepon", width: 150 },
        {
            field: "MotivasiMengajar",
            headerName: "Motivasi Mengajar",
            width: 200,
        },
        {
            field: "Action",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="w-full h-fit flex justify-center gap-3">
                        <button
                            className="p-2 border border-black rounded-md w-fit"
                            onClick={(e) => updateGuru(params.row.id_guru)}
                        >
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                            className="p-2 bg-merah-bs text-white rounded-md border border-merah-bs w-fit"
                            onClick={(e) => hapusGuru(params.row.id_guru)}
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
            <PreviewPhoto
                stateChanger={setShowPhoto}
                status={showPhoto}
                src={singleGuru.foto}
            />
            <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col">
                <h1
                    className="text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center"
                    onClick={() => convertToDataTable(guru)}
                >
                    Kelola Data Guru
                </h1>
                <div className="w-full h-[75vh]">
                    <DataGrid
                        rows={convertToDataTable(guru)}
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
                    {/* <Table sumber={peserta} search_field={tes} /> */}
                    {/* <Table sumber={peserta} search_field="Nama" />
                    
                    {/* <h1></h1> */}
                    {/* <button onClick={() => setTes("Gan")}>Change</button> */}
                </div>
            </div>
            <FormGuru
                handleGuru={handleGuru}
                guru={singleGuru}
                setGuru={setSingleGuru}
                show={showForm}
                setShow={setShowForm}
            />
        </>
    );
}
