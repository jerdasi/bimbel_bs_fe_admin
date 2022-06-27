import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FormJenjang from "./FormJenjang";
import Swal from "sweetalert2";
import { PaketContext } from "../Context/PaketBimbingan";

export default function TabelPaket() {
    const [jenjang, setJenjang] = useState([]);
    const [paketBimbingan, setPaketBimbingan] = useState([]);

    const {
        jenjangItem,
        setJenjangItem,
        show,
        setShow,
        formPurpose,
        setFormPurpose,
    } = useContext(PaketContext);

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
        let endpoint = `http://localhost:3000/${url}${
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

    // Function Nambah Jenjang
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

    const handleEditJenjang = async (key) => {
        setFormPurpose("Edit");
        let hasil = await handleRequest({
            method: "GET",
            url: "jenjang-pendidikan",
            key,
        });
        setShow(!show);
        setJenjangItem({
            ...hasil,
        });
    };

    return (
        <>
            <div className="w-full md:w-4/5 flex flex-col md:p-4">
                <div className="header text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                    <h1>Kelola Paket Belajar</h1>
                </div>
                <div className="h-full w-full overflow-auto flex flex-wrap gap-4">
                    {jenjang.length === 0
                        ? "Tidak ada Paket Bimbingan"
                        : jenjang.map((item) => (
                              <div
                                  className="w-full h-[35vh] flex flex-col my-4"
                                  key={item.id}
                              >
                                  <div className="w-full md:h-[10%] flex flex-col md:flex-row items-start md:items-center mb-2">
                                      <h1 className="text-2xl w-fit md:w-4/5 h-full font-bold text-black/80 opacity-80">
                                          {item.nama_jenjang}
                                      </h1>
                                      <div className="w-1/2 md:w-1/5 h-full flex gap-2">
                                          <button
                                              className="h-full w-1/2 rounded-md border border-abu-bs hover:bg-abu-bs hover:border-black hover:text-white"
                                              onClick={() => {
                                                  handleEditJenjang(item.id);
                                              }}
                                          >
                                              Edit
                                          </button>
                                          <button
                                              className="h-full w-1/2 bg-merah-bs text-white rounded-md border border-abu-bs"
                                              onClick={() =>
                                                  handleHapusJenjang(item.id)
                                              }
                                          >
                                              Hapus
                                          </button>
                                      </div>
                                  </div>
                                  <div className="h-[90%] w-full flex flex-col flex-wrap overflow-auto gap-4">
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
                                                    <div className="w-5/6 md:w-1/3 h-full border border-abu-bs p-2 rounded-md flex flex-col relative group">
                                                        <div className="flex justify-center h-full">
                                                            <img
                                                                src="images/logo-paket.jpg"
                                                                alt=""
                                                                className="h-full object-cover group-hover:blur-sm"
                                                            />
                                                        </div>
                                                        <div className="min-h-1/5 w-full absolute bottom-0 left-0 p-2">
                                                            <h1 className="font-bold text-lg w-fit bg-merah-bs rounded-md text-white px-2">
                                                                {
                                                                    hasil.nama_paket
                                                                }
                                                            </h1>
                                                            <p className="hidden group-hover:block">
                                                                Rp.{" "}
                                                                {hasil.harga}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
            <FormJenjang handleTambahEditJenjang={handleTambahEditJenjang} />
        </>
    );
}
