import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import FormJenjang from "./FormJenjang";
import Swal from "sweetalert2";
import {PaketContext} from "../Context/PaketBimbingan";
import FormPaket from "./FormPaket";
import FormGrup from "./FormGrup";

export default function TabelPaket() {
    const {
        jenjang,
        setJenjang,
        paketBimbingan,
        setPaketBimbingan,
        setJenjangItem,
        paketItem,
        setPaketItem,
        showJenjang,
        setShowJenjang,
        showPaket,
        setShowPaket,
        setFormPurpose,
    } = useContext(PaketContext);

    const [showGroup, setShowGroup] = useState(false)
    const [idPaket, setIdPaket] = useState(0)

    const showPopUp = (title, description, icon) => {
        Swal.fire(`${title}!`, `${description}`, `${icon}`);
    };

    // Axios Handle Request
    const handleRequest = async ({
                                     method = "GET",
                                     url = "",
                                     data = {},
                                     key = -1,
                                 }) => {
        let endpoint = `${process.env.REACT_APP_API}/${url}${
            key !== -1 ? `/${key}` : ""
        }`;
        let res, information;
        try {
            if (
                method.toUpperCase() === "GET" ||
                method.toUpperCase() === "DELETE"
            ) {
                res = await axios({
                    method,
                    url: endpoint,
                });
            } else if (
                method.toUpperCase() === "POST" ||
                method.toUpperCase() === "PUT"
            ) {
                res = await axios({
                    method,
                    url: endpoint,
                    data,
                });
            }
            information = {
                status: res.data.status,
                message: res.data.message,
            };
        } catch (e) {
            information = {
                status: e.response.status,
                message: e.response.data.message
                    ? e.response.data.message
                    : "Data Tidak Tersedia",
            };
        } finally {
            // console.log(data, key);
            if (method !== "GET") {
                showPopUp(
                    information.status === 200 ? "Berhasil" : "Gagal",
                    information.message,
                    information.status === 200 ? "success" : "error"
                );
            }
        }
        // console.log(endpoint);

        return res.data.data;
    };

    useEffect(() => {
        handleRequest({
            method: "GET",
            url: "jenjang-pendidikan",
        }).then((res) => setJenjang([...res]));
        handleRequest({
            method: "GET",
            url: "paket-bimbingan",
        }).then((res) => setPaketBimbingan([...res]));
    }, []);

    // Function Nambah Update Jenjang
    const handleTambahEditJenjang = async (data) => {
        let endpoint = `jenjang-pendidikan${!data.id ? "" : `/${data.id}`}`;
        let hasil = await handleRequest({
            method: `${!data.id ? "POST" : "PUT"}`,
            url: endpoint,
            data,
        });
        let indexLocation = jenjang.findIndex((item) => item.id === data.id);
        if (indexLocation !== -1) {
            let arrJenjang = [...jenjang];
            arrJenjang[indexLocation] = hasil;
            setJenjang([...arrJenjang]);
        } else {
            setJenjang([...jenjang, hasil]);
        }
    };

    // Function Nambah Update Paket
    const handleTambahEditPaket = async (data) => {
        console.log(data);
        let endpoint = `paket-bimbingan${!data.id ? "" : `/${data.id}`}`;
        let hasil = await handleRequest({
            method: `${!data.id ? "POST" : "PUT"}`,
            url: endpoint,
            data,
        });
        let indexLocation = paketBimbingan.findIndex(
            (item) => item.id === data.id
        );
        if (indexLocation !== -1) {
            let arrPaket = [...paketBimbingan];
            arrPaket[indexLocation] = hasil;
            setPaketBimbingan([...arrPaket]);
        } else {
            setPaketBimbingan([...paketBimbingan, hasil]);
        }
    };

    // Function Hapus Jenjang
    const handleHapusJenjang = (key) => {
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan menghapus jenjang pendidikan ini dan semua paket yang tergabung!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Ga AH, Saya Ga Yakin ",
        }).then((result) => {
            if (result.isConfirmed) {
                handleRequest({
                    method: "DELETE",
                    url: "jenjang-pendidikan",
                    key,
                }).then((res) => {
                    if (res) {
                        let result = jenjang.filter((item) => item.id !== key);
                        setJenjang([...result]);
                    }
                });
            }
        });
    };

    const handleHapusPaket = (key) => {
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan menghapus paket bimbingan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Saya Yakin!",
            cancelButtonText: "Ga AH, Saya Ga Yakin ",
        }).then((result) => {
            if (result.isConfirmed) {
                handleRequest({
                    method: "DELETE",
                    url: "paket-bimbingan",
                    key,
                }).then((res) => {
                    if (res) {
                        let result = paketBimbingan.filter(
                            (item) => item.id !== key
                        );
                        setPaketBimbingan([...result]);
                    }
                });
            }
        });
    };

    const handleEditJenjang = async (key) => {
        setFormPurpose("Edit");
        let hasil = await handleRequest({
            method: "GET",
            url: "jenjang-pendidikan",
            key,
        });
        setShowJenjang(!showJenjang);
        setJenjangItem({
            ...hasil,
        });
    };

    const handleEditPaket = async (key) => {
        setFormPurpose("Edit");
        let hasil = await handleRequest({
            method: "GET",
            url: "paket-bimbingan",
            key,
        });
        setShowPaket(!showPaket);
        setPaketItem({
            ...hasil,
        });
    };

    return (
        <>
            <div className="w-full md:w-4/5 flex flex-col md:p-4">
                <div
                    className="header text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                    <h1>Kelola Paket Belajar</h1>
                </div>
                <div className="h-full w-full overflow-auto flex flex-wrap gap-4">
                    {/* Looping Section Jenjang */}
                    {jenjang.length === 0
                        ? "Tidak ada Paket Bimbingan"
                        : jenjang.map((item) => (
                            <div
                                className="w-full h-[40vh] flex flex-col my-4"
                                key={item.id}
                            >
                                <div
                                    className="w-full md:h-[10%] flex flex-col md:flex-row items-start md:items-center mb-2">
                                    <h1 className="text-2xl w-fit md:w-3/5 h-full font-bold text-black/80 opacity-80">
                                        {item.nama_jenjang}
                                    </h1>
                                    <div className="w-full md:w-2/5 h-full flex gap-2">
                                        <button
                                            className="h-full w-1/3 py-1 md:py-0 rounded-md border border-abu-bs hover:bg-abu-bs hover:border-black hover:text-white"
                                            onClick={() => {
                                                // Scroll Ke atas
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                });
                                                setFormPurpose("Simpan");
                                                setShowPaket(!showPaket);
                                                setPaketItem({
                                                    ...paketItem,
                                                    id_jenjang: item.id,
                                                });
                                            }}
                                        >
                                            <i class="fa-solid fa-plus"></i>{" "}
                                            Tambah Paket
                                        </button>
                                        <button
                                            className="h-full w-1/3 py-1 md:py-0 rounded-md border border-abu-bs hover:bg-abu-bs hover:border-black hover:text-white"
                                            onClick={() => {
                                                handleEditJenjang(item.id);
                                            }}
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>{" "}
                                            Edit Jenjang
                                        </button>
                                        <button
                                            className="h-full w-1/3 py-1 md:py-0 bg-merah-bs text-white rounded-md border border-abu-bs"
                                            onClick={() =>
                                                handleHapusJenjang(item.id)
                                            }
                                        >
                                            <i class="fa-solid fa-trash-can"></i>{" "}
                                            Hapus Jenjang
                                        </button>
                                    </div>
                                </div>

                                <div className="h-[90%] w-full flex flex-col flex-wrap overflow-auto gap-4">
                                    {/* Looping Section Paket dalam Jenjang */}
                                    {paketBimbingan.filter(
                                        (paket) =>
                                            paket.id_jenjang === item.id
                                    ).length === 0
                                        ? "Tidak ada Paket Bimbingan"
                                        : paketBimbingan
                                            .filter(
                                                (paket) =>
                                                    paket.id_jenjang ===
                                                    item.id
                                            )
                                            .map((hasil) => (
                                                <div
                                                    className="w-5/6 md:w-1/3 h-full border border-abu-bs p-2 rounded-md flex flex-col relative group" onClick={(e) => {
                                                        setShowGroup(!showGroup);
                                                        setIdPaket(parseInt(hasil.id))
                                                }}>
                                                    <div className="flex justify-center h-full">
                                                        <img
                                                            src="images/logo-paket.jpg"
                                                            alt=""
                                                            className="h-full object-cover group-hover:blur-sm"
                                                        />
                                                    </div>
                                                    <div
                                                        className="min-h-1/5 w-full absolute bottom-0 left-0 p-2 flex items-center">
                                                        <div className="description w-11/12">
                                                            <h1 className="font-bold text-lg w-fit bg-merah-bs rounded-md text-white px-2">
                                                                {
                                                                    hasil.nama_paket
                                                                }
                                                            </h1>
                                                            <p className="hidden group-hover:block">
                                                                Rp.{" "}
                                                                {
                                                                    hasil.harga
                                                                }
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="detail w-1/12 p-2 border rounded-r-md bg-merah-bs text-white">
                                                            <i className="fa-solid fa-chevron-right"></i>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="min-h-1/5 w-full absolute top-0 left-0 p-2 flex justify-end gap-2">
                                                        <button
                                                            className="border px-1 bg-merah-bs text-white hidden rounded-md group-hover:block"
                                                            onClick={() => {
                                                                setIdPaket(0)
                                                                setShowGroup(!showGroup)
                                                            }
                                                            }
                                                        >
                                                            <i class="fa-solid fa-plus text-lg"></i>
                                                            <span className="hidden ">
                                                                    Tambah Grup
                                                                </span>
                                                        </button>
                                                        <button
                                                            className="border px-1 bg-merah-bs text-white hidden rounded-md group-hover:block"
                                                            onClick={() =>
                                                                handleEditPaket(
                                                                    hasil.id
                                                                )
                                                            }
                                                        >
                                                            <i class="fa-solid fa-pen-to-square text-lg"></i>
                                                        </button>
                                                        <button
                                                            className="border px-1 bg-merah-bs text-white hidden rounded-md group-hover:block"
                                                            onClick={() =>
                                                                handleHapusPaket(
                                                                    hasil.id
                                                                )
                                                            }
                                                        >
                                                            <i class="fa-solid fa-trash-can text-lg"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <FormJenjang handleTambahEditJenjang={handleTambahEditJenjang}/>
            <FormPaket handleTambahEditPaket={handleTambahEditPaket}/>
            <FormGrup showGroup={showGroup} setShowGroup={setShowGroup} idPaket={idPaket} setIdPaket={setIdPaket}/>
        </>
    );
}
