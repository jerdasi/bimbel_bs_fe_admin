import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "autoprefixer";
import Swal from "sweetalert2";
// import { useEffect } from "react";

export default function FormGrup() {
    const [filteredKelas, setFilteredKelas] = useState([]);
    // const [show, setShow] = useState(false);
    const [hari, setHari] = useState([]);
    const [jam, setJam] = useState([]);
    const [operasional, setOperasional] = useState([]);
    const [kelas, setKelas] = useState([]);
    const [formData, setFormData] = useState();
    const [pilihanOperasional, setPilihanOperasional] = useState([]);
    const [filterHari, setFilterHari] = useState("all");

    // const handleShow = () => {
    //     console.log(show);
    //     // setGuru({
    //     //     nama: "",
    //     //     tempat: "",
    //     //     tanggal_lahir: moment().format("DD-MM-YYYY"),
    //     //     pendidikan_terakhir: "",
    //     //     fotoGuru: null,
    //     //     alamat: "",
    //     //     telepon: "",
    //     //     motivasi_mengajar: "",
    //     // });
    //     setShow(!show);
    //     console.log(formData.id);
    //     if (!guru.id) {
    //         console.log("Baru");
    //         // let pilihan = operasional.map((item) => {
    //         //     return {
    //         //         id: item.id,
    //         //         id_hari: item.id_hari,
    //         //         checked: false,
    //         //     };
    //         // });
    //         // setPilihanOperasional(pilihan);
    //     } else {
    //         console.log("Edit");
    //         // let pilihan = operasional.map((item) => {
    //         //     return {
    //         //         id: item.id,
    //         //         id_hari: item.id_hari,
    //         //         checked: true,
    //         //     };
    //         // });
    //         // setPilihanOperasional(pilihan);
    //     }
    //     console.log(formData);
    // };

    // const tambahGuru = (event) => {
    //     event.preventDefault();
    //     // delete formData["id_kelas"];
    //     const config = {
    //         headers: { "Content-Type": "multipart/form-data" },
    //     };
    //     let form_data = new FormData();
    //     for (let key in formData) {
    //         form_data.append(key, formData[key]);
    //     }
    //     let jadwal = pilihanOperasional
    //         .map((item) => {
    //             let data;
    //             if (item.checked) {
    //                 data = {
    //                     id_hari_jam: item.id,
    //                 };
    //             }
    //             return data;
    //         })
    //         .filter((notUndefined) => notUndefined !== undefined);
    //     let jadwal_guru = {
    //         id_guru: "",
    //         jadwal,
    //     };

    //     axios
    //         .post(`${process.env.REACT_APP_API}/guru`, form_data, config)
    //         .then((res) => {
    //             handleGuru(res.data.data);
    //             jadwal_guru.id_guru = res.data.data.id;
    //             // console.log(jadwal_guru);
    //             axios
    //                 .post(
    //                     `${process.env.REACT_APP_API}/waktu-guru`,
    //                     jadwal_guru
    //                 )
    //                 .then((res) => {
    //                     console.log(res.data);
    //                     Swal.fire(
    //                         "Berhasil",
    //                         "Berhasil Menambah Guru dan Jadwal",
    //                         "success"
    //                     );
    //                 });
    //             setShow();
    //         })
    //         .catch((err) => console.log(err));
    // };

    // const editGuru = (event) => {
    //     event.preventDefault();
    //     // delete formData["id_kelas"];
    //     const config = {
    //         headers: { "Content-Type": "multipart/form-data" },
    //     };
    //     let form_data = new FormData();
    //     for (let key in formData) {
    //         form_data.append(key, formData[key]);
    //     }
    //     axios
    //         .put(
    //             `${process.env.REACT_APP_API}/guru/${formData.id}`,
    //             form_data,
    //             config
    //         )
    //         .then((res) => {
    //             handleGuru(res.data.data, formData.id);
    //             handleShow();
    //         });
    //     // handlePeserta("Tes", 35);
    // };

    // Use Effect
    // useEffect(() => {
    // axios.get(`${process.env.REACT_APP_API}/hari`).then((res) => {
    //     setHari([...res.data.data]);
    // });
    // axios.get(`${process.env.REACT_APP_API}/jam`).then((res) => {
    //     setJam([...res.data.data]);
    // });
    // axios.get(`${process.env.REACT_APP_API}/hari-jam`).then((res) => {
    //     setOperasional([...res.data.data]);
    //     let pilihan = res.data.data.map((item) => {
    //         return {
    //             id: item.id,
    //             id_hari: item.id_hari,
    //             checked: false,
    //         };
    //     });
    //     setPilihanOperasional(pilihan);
    // });
    // axios.get(`${process.env.REACT_APP_API}/kelas`).then((res) => {
    //     setKelas([...res.data.data]);
    //     setFilteredKelas([...res.data.data]);
    // });
    // setFormData(guru);

    // Jika Edit Maka Akan Menampilkan Jadwal yang telah ada
    // if (guru.id) {
    //     // console.log(pilihanOperasional.findIndex((item) => item.id == 60));
    //     axios
    //         .get(`${process.env.REACT_APP_API}/waktu-guru?guru=${guru.id}`)
    //         .then((res) => {
    //             let hasil = res.data.data;
    //             let pilihan = operasional.map((item) => {
    //                 return {
    //                     id: item.id,
    //                     id_hari: item.id_hari,
    //                     checked: false,
    //                 };
    //             });
    //             hasil.forEach((element) => {
    //                 if (
    //                     pilihan.findIndex(
    //                         (item) => item.id == element.id_hari_jam
    //                     ) != -1
    //                 ) {
    //                     pilihan[
    //                         pilihan.findIndex(
    //                             (item) => item.id == element.id_hari_jam
    //                         )
    //                     ].checked = true;
    //                 }
    //                 // console.log(element.id_hari_jam);
    //             });
    //             console.log({ hasil: hasil });
    //             console.log({ pilihan: pilihan });
    //             console.log({ operasional: operasional });
    //             setPilihanOperasional(pilihan);
    //             // let pilihan = [...operasional];
    //             // pilihan = pilihan.map((item) => {
    //             //     return {
    //             //         id: item.id,
    //             //         id_hari: item.id_hari,
    //             //         checked: false,
    //             //     };
    //             // });
    //             // console.log({ pilihanLama: pilihan });
    //             // console.log(guru.id);
    //             // console.log(hasil);
    //             // // hasil.splice(0, 10);
    //             // // console.log(hasil);
    //             // hasil.forEach((element) => {
    //             //     if (
    //             //         pilihan.findIndex(
    //             //             (item) => item.id == element.id_hari_jam
    //             //         )
    //             //     ) {
    //             //         pilihan[
    //             //             pilihan.findIndex(
    //             //                 (item) => item.id == element.id_hari_jam
    //             //             )
    //             //         ].checked = true;
    //             //     }
    //             //     // console.log(element.id_hari_jam);
    //             // });
    //             // console.log({ pilihanBaru: pilihan });
    //             // setPilihanOperasional(pilihan);
    //         });
    // }
    // }, [guru]);

    return (
        <div className="">
            {/* Form Data Siswa */}
            <div
                className={[
                    "background w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center top-0 left-0 z-50 absolute",
                    // show ? "absolute" : "hidden",
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
                                // onClick={handleShow}
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
                                        name="nama_siswa"
                                        id="nama_siswa"
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Grup A"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nama: e.target.value,
                                            })
                                        }
                                        // value={formData.nama}
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
                                                setFilterHari(e.target.value)
                                            }
                                        >
                                            <option value="all" disabled>
                                                Pilih Salah Satu
                                            </option>
                                            {hari.map((item) => (
                                                <option value={item.id}>
                                                    {item.nama_hari}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3 w-1/2">
                                    <div className="title mb-1">
                                        <p>Guru</p>
                                    </div>
                                    <div className="input-field flex gap-2">
                                        <select
                                            name="hari_operasional"
                                            id="hari_operasional"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            onChange={(e) =>
                                                setFilterHari(e.target.value)
                                            }
                                        >
                                            <option value="all" disabled>
                                                Pilih Salah Satu
                                            </option>
                                            {hari.map((item) => (
                                                <option value={item.id}>
                                                    {item.nama_hari}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
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
                                    <button className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
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
                                    <button className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
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
                                    <button className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
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
                                    <button className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
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
                                    <button className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white">
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
