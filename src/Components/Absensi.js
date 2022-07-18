import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import PreviewPhoto from "./SmartComponent/PreviewPhoto";
import FormGuru from "./FormGuru";
import moment from "moment";
import Swal from "sweetalert2";
import FormTestimoni from "./FormTestimoni";

export default function Absensi() {
    const [guru, setGuru] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/guru`)
            .then((res) => setGuru(res.data.data));
    }, []);

    return (
        <>
            <div className="w-full h-full md:w-4/5 md:h-full md:p-4 flex flex-col">
                <h1 className="text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                    Kelola Absensi
                </h1>
                <div className="w-full h-[75vh]">
                    <>
                        <div className="title mt-4 font-bold">
                            Tambahkan Absensi Guru
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-2 mb-2">
                            <select
                                name="guru"
                                id="guru"
                                className="p-2 w-full md:w-1/2 rounded-md border border-abu-bs"
                            >
                                <option value={0} disabled>
                                    Pilih Salah Satu
                                </option>
                                {guru.map((item) => (
                                    <option value={item.id}>{item.nama}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Input Total Jam Kerja Hari Ini"
                                className="p-2 w-full md:w-1/2 rounded-md border border-abu-bs"
                            />
                        </div>
                        <button className="w-full md:w-1/5 border border-black p-2 rounded-md bg-merah-bs text-white">
                            Tambahkan
                        </button>
                    </>

                    <>
                        <div className="title mt-10 font-bold">
                            Riwayat Absensi Guru
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-2 mb-2">
                            <select
                                name="guru"
                                id="guru"
                                className="p-2 w-full md:w-1/2 rounded-md border border-abu-bs"
                            >
                                <option value={0} disabled>
                                    Pilih Salah Satu
                                </option>
                                {guru.map((item) => (
                                    <option value={item.id}>{item.nama}</option>
                                ))}
                            </select>
                            <input
                                type="date"
                                name=""
                                id=""
                                className="h-full border border-abu-bs rounded-md p-2 w-full md:w-1/2"
                            />
                            <input
                                type="date"
                                name=""
                                id=""
                                className="h-full border border-abu-bs rounded-md p-2 w-full md:w-1/2"
                            />
                        </div>
                        <button className="w-full md:w-1/5 border border-black p-2 rounded-md bg-merah-bs text-white">
                            Cari
                        </button>
                    </>

                    <>
                        <div className="result-search w-full h-[50vh] border border-abu-bs rounded-md p-2 pt-0 overflow-auto mt-3">
                            <h1 className="font-semibold sticky top-0 left-0 backdrop-blur-sm py-2 bg-white/30">
                                Riwayat
                            </h1>
                            <ul>
                                {guru.length ? (
                                    guru.map((item) => (
                                        <li
                                            className="p-2 hover:bg-merah-bs hover:text-white hover:rounded-md border-b border-abu-bs"
                                            onClick={() => {
                                                // setFormPendaftaran({
                                                //     ...formPendaftaran,
                                                //     nama_siswa: item.nama,
                                                //     id_jenjang: item.id_jenjang,
                                                // });
                                                // setFormValue({
                                                //     ...formValue,
                                                //     id_siswa: item.id,
                                                // });
                                            }}
                                        >
                                            {`${item.nama} - 3 Jam / ${moment(
                                                item.createdAt
                                            ).format("yyyy-MM-DD")}`}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-center opacity-50">
                                        Tidak ada siswa
                                    </p>
                                )}
                            </ul>
                        </div>
                    </>

                    {/* <DataGrid
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
                    /> */}
                </div>
            </div>
            {/* <FormTestimoni
                handleTestimoni={handleTestimoni}
                setShowForm={setShowForm}
                showForm={showForm}
                testimoni={testimoni}
                setTestimoni={setTestimoni}
            /> */}
        </>
    );
}
