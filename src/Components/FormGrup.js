import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import moment from "moment";
import {data} from "autoprefixer";
import Swal from "sweetalert2";
// import { useEffect } from "react";

export default function FormGrup({showGroup, setShowGroup, idPaket, setIdPaket}) {
    const [guru, setGuru] = useState([]);
    const [paket, setPaket] = useState([]);
    const [formData, setFormData] = useState({
        nama_grup: "",
        id_paket: 0,
        id_grup: 0,
        kuota: 0,
    })

    const [hari, setHari] = useState([]);
    const [jam, setJam] = useState([]);
    const [operasional, setOperasional] = useState([]);
    const [kelas, setKelas] = useState([]);
    // const [formData, setFormData] = useState();
    const [pilihanOperasional, setPilihanOperasional] = useState([]);
    const [filterHari, setFilterHari] = useState("all");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/guru`).then((res) => {
            setGuru(res.data.data)
        })
        axios.get(`${process.env.REACT_APP_API}/paket-bimbingan`).then((res) => {
            setPaket(res.data.data)
        })
        if(idPaket != 0){
            setFormData({...formData, id_paket: idPaket})
        }
    }, [])

    const handleShow = () => {
        setIdPaket(0)
        setShowGroup(!showGroup)
    }

        return (
        <div className="">
            {/* Form Data Siswa */}
            <div
                className={[
                    "background w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center top-0 left-0 z-50 absolute",
                    showGroup ? "absolute" : "hidden",
                ].join(" ")}
            >
                <div className="w-5/6 md:w-1/2 box-form h-3/4 overlow-auto">
                    <form
                        action=""
                        className="border h-full bg-white rounded-lg flex flex-col relative"
                    >
                        <div className="header-form flex items-center relative mb-2 border-b border-abu-bs h-[10%] p-4">
                            <h1 className="text-2xl font-bold text-merah-bs tracking-widest">
                                Tambah Grup
                                {/* {formData.id ? "Edit" : "Tambah"} Guru */}
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={handleShow}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            <div className="title font-bold">
                                <p>
                                    Grup Paket Bimbingan{" "}
                                    <span className="text-merah-bs">
                                        Regular SD
                                    </span>
                                </p>
                            </div>
                            <div className="slider-grup flex flex-col flex-wrap gap-4 overflow-auto h-32 mb-1">
                                <div className="w-4/5 h-full border border-biru-bs rounded-md p-2">
                                    tes
                                </div>
                                <div className="w-4/5 h-full border border-biru-bs rounded-md p-2">
                                    tes
                                </div>
                                <div className="w-4/5 h-full border border-biru-bs rounded-md p-2">
                                    tes
                                </div>
                                <div className="w-4/5 h-full border border-biru-bs rounded-md p-2">
                                    tes
                                </div>
                                <div className="w-4/5 h-full border border-biru-bs rounded-md p-2">
                                    tes
                                </div>
                            </div>

                            <div className="title font-bold mt-8">
                                <p>Tambah Grup Paket Bimbingan</p>
                            </div>
                            <div className="row mb-3">
                                <div className="title mb-1">
                                    <p>Nama Grup</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="nama_grup"
                                        id="nama_grup"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Grup A"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nama_grup: e.target.value,
                                            })
                                        }
                                        value={formData.nama_grup}
                                    />
                                </div>
                            </div>

                            <div className="row flex gap-4">
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Paket Bimbingan</p>
                                    </div>
                                    <div className="input-field flex gap-2">
                                        <select
                                            name="hari_operasional"
                                            id="hari_operasional"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            onChange={(e) =>
                                                setFormData({...formData, id_paket: parseInt(e.target.value)})
                                            }
                                        >
                                            <option value="all" disabled>
                                                Pilih Salah Satu
                                            </option>
                                            {paket.map((item) => {
                                                return (
                                                    <option value={item.id} selected={item.id == idPaket? true: false}>
                                                        {item.nama_paket}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3 w-full">
                                <div className="title mb-1">
                                    <p>Guru</p>
                                </div>
                                <div className="w-full h-48 flex flex-col flex-wrap gap-4 overflow-x-auto hide-scrollbar">
                                    {guru.map(item => (
                                        <div className="h-full w-48 border border-black relative rounded-md">
                                            <img src={`${process.env.REACT_APP_API}/${item.foto}`} alt="" className="h-full w-full object-cover hover:object-contain"/>
                                            <div className="absolute bottom-0 left-0 w-full">
                                                <h1 className="font-bold">{item.nama}</h1>
                                            </div>
                                        </div>
                                    ))}
                                    {guru.map(item => (
                                        <div className="h-full w-48 border border-black relative rounded-md">
                                            <img src={`${process.env.REACT_APP_API}/${item.foto}`} alt="" className="h-full w-full object-cover hover:object-contain"/>
                                            <div className="absolute bottom-4 left-4 w-full">
                                                <h1 className="font-bold">{item.nama}</h1>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="row mb-3 w-full">
                                <div className="title mb-1">
                                    <p>Kuota</p>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="number"
                                        name="telepon_anak"
                                        id="telepon_anak"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="081212345678"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                telepon: e.target.value,
                                            })
                                        }
                                        // value={formData.telepon}
                                    />
                                </div>
                            </div>

                            <div className="title font-bold mt-8 mb-1">
                                <p>Atur Jadwal Grup</p>
                            </div>
                            <div className="w-full h-32 overflow-auto">
                                <div className="w-full flex gap-2 mb-1">
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Hari</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Jam</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
                                        Set
                                    </button>
                                </div>
                                <div className="w-full flex gap-2 mb-1">
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Hari</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Jam</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
                                        Set
                                    </button>
                                </div>
                                <div className="w-full flex gap-2 mb-1">
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Hari</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Jam</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
                                        Set
                                    </button>
                                </div>
                                <div className="w-full flex gap-2 mb-1">
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Hari</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Jam</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
                                        Set
                                    </button>
                                </div>
                                <div className="w-full flex gap-2 mb-1">
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Hari</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="hari_operasional"
                                        id="hari_operasional"
                                        className="p-2 w-2/5 rounded-md border border-abu-bs"
                                        onChange={(e) =>
                                            setFilterHari(e.target.value)
                                        }
                                    >
                                        <option value="all">Pilih Jam</option>
                                        {hari.map((item) => (
                                            <option value={item.id}>
                                                {item.nama_hari}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
                                        Set
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            {/* {formData.id && (
                                <button
                                    className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                    // onClick={editGuru}
                                >
                                    Edit
                                </button>
                            )} */}
                            {/* {!formData.id && (
                                <button
                                    className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                    // onClick={tambahGuru}
                                >
                                    Simpan
                                </button>
                            )} */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
