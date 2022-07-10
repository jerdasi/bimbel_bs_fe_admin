import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import PreviewPhoto from "./SmartComponent/PreviewPhoto";
import FormSiswa from "./FormSiswa";
import moment from "moment";
import Swal from "sweetalert2";

export default function TableSiswa() {
    const [peserta, setPeserta] = useState([]);
    const [dataTabel, setDataTabel] = useState([]);
    const [jenjang, setJenjang] = useState([]);
    const [singlePeserta, setSinglePeserta] = useState({
        nama: "",
        tempat: "",
        tanggal_lahir: moment().format("DD-MM-YYYY"),
        alamat: "",
        id_jenjang: 0,
        asal_sekolah: "",
        fotoPeserta: null,
        nama_ayah: "",
        nama_ibu: "",
        telepon_anak: "",
        telepon_ayah: "",
        telepon_ibu: "",
    });

    const [showPhoto, setShowPhoto] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:3005/jenjang-pendidikan")
            .then((res) => setJenjang(res.data.data));
        axios
            .get("http://localhost:3005/peserta-didik")
            .then((res) => setPeserta(res.data.data));
    }, []);

    // handleTambahEditPeserta
    // Id 0 artinya post, selain itu edit/update
    const handlePeserta = (pesertaBaru, id = 0) => {
        if (id == 0) {
            setPeserta([...peserta, pesertaBaru]);
        } else {
            let hasil = peserta.findIndex((item) => item.id == id);
            let tempPeserta = [...peserta];
            tempPeserta[hasil] = pesertaBaru;
            setPeserta([...tempPeserta]);
        }
    };

    // handleUpdatePeserta
    // Cari dan kirim ke form
    const updatePeserta = (id) => {
        let peserta_update = peserta.find((el) => el.id == id);
        setShowForm(!showForm);
        setSinglePeserta(peserta_update);
    };

    const showFotoPeserta = (id) => {
        let peserta_update = peserta.find((el) => el.id == id);
        setShowPhoto(!showPhoto);
        setSinglePeserta(peserta_update);
    };

    // handleHapusPeserta
    const hapusPeserta = (id) => {
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan menghapus peserta didik ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Ga AH, Saya Ga Yakin ",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${process.env.REACT_APP_API}/peserta-didik/${id}`)
                    .then((res) =>
                        setPeserta(
                            peserta.filter(
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
                id_peserta: item.id,
                Nama: item.nama,
                "Tempat/TanggalLahir": `${item.tempat}/${moment(
                    item.tanggal_lahir
                ).format("DD-MM-YYYY")}`,
                Jenjang: item.id_jenjang,
                "Asal Sekolah": item.asal_sekolah,
                Alamat: item.alamat,
                Foto: item.foto,
                "Nama Ayah": item.nama_ayah,
                "Nama Ibu": item.nama_ibu,
                "Telepon Anak": item.telepon_anak,
                "Telepon Ayah": item.telepon_ayah,
                "Telepon Ibu": item.telepon_ibu,
                Status: item.id_grup ? "Aktif" : "Tidak Aktif",
            };
        });
    };

    const columns = [
        { field: "Nama", headerName: "Nama", width: 200 },
        {
            field: "Tempat/TanggalLahir",
            headerName: "Tempat / Tanggal Lahir",
            width: 200,
        },
        {
            field: "Jenjang",
            headerName: "Jenjang",
            width: 70,
            renderCell: (params) => {
                return jenjang.filter((j) => j.id == params.value)[0][
                    "akronim"
                ];
            },
        },
        { field: "Asal Sekolah", headerName: "Asal Sekolah", width: 100 },
        { field: "Alamat", headerName: "Alamat", width: 200 },
        {
            field: "Foto",
            headerName: "Foto",
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <i
                            class="fa-solid fa-eye"
                            onClick={(e) => {
                                showFotoPeserta(params.row.id_peserta);
                            }}
                        ></i>{" "}
                        {`  ...${params.value}`}
                    </div>
                );
            },
        },
        { field: "Nama Ayah", headerName: "Nama Ayah", width: 150 },
        { field: "Nama Ibu", headerName: "Nama Ibu", width: 150 },
        { field: "Telepon Anak", headerName: "Telepon Anak", width: 150 },
        { field: "Telepon Ayah", headerName: "Telepon Ayah", width: 150 },
        { field: "Telepon Ibu", headerName: "Telepon Ibu", width: 150 },
        { field: "Status", headerName: "Status", width: 100 },
        {
            field: "Action",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="w-full h-fit flex justify-center gap-3">
                        <button
                            className="p-2 border border-black rounded-md w-fit"
                            onClick={(e) =>
                                updatePeserta(params.row.id_peserta)
                            }
                        >
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                            className="p-2 bg-merah-bs text-white rounded-md border border-merah-bs w-fit"
                            onClick={(e) => hapusPeserta(params.row.id_peserta)}
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
                src={singlePeserta.foto}
            />
            <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col">
                <h1
                    className="text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center"
                    onClick={() => convertToDataTable(peserta)}
                >
                    Kelola Data Peserta Didik
                </h1>
                <div className="w-full h-[75vh]">
                    <DataGrid
                        rows={convertToDataTable(peserta)}
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
            <FormSiswa
                handlePeserta={handlePeserta}
                siswa={singlePeserta}
                show={showForm}
                setShow={setShowForm}
            />
        </>
    );
}
