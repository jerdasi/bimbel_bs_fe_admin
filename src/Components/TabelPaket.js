import React, { useState, useEffect } from "react";
import axios from "axios";
import FormJenjang from "./FormJenjang";

export default function TabelPaket() {
    const [jenjang, setJenjang] = useState([]);
    const [paketBimbingan, setPaketBimbingan] = useState([]);

    const getData = async (route) => {
        const res = await axios.get("http://localhost:3000/" + route);
        return await res.data.data;
    };

    useEffect(() => {
        getData("jenjang-pendidikan").then((res) => setJenjang([...res]));
        getData("paket-bimbingan").then((res) => setPaketBimbingan([...res]));
    }, []);

    const handleTambahJenjang = (data) => {
        setJenjang([...jenjang, data]);
    };

    return (
        <>
            <div className="w-full md:w-4/5 flex flex-col md:p-4">
                <div className="header text-3xl font-bold text-merah-bs h-16 border-b border-biru-bs mb-1 flex items-center">
                    <h1>Kelola Paket Belajar</h1>
                </div>
                <div className="h-full overflow-auto flex flex-col gap-4">
                    {jenjang.length === 0
                        ? "Tidak ada Paket Bimbingan"
                        : jenjang.map((item) => (
                              <div
                                  className="w-full h-[35vh] flex flex-col my-4"
                                  key={item.id}
                              >
                                  <div className="w-full h-fit md:h-[10%] flex flex-col md:flex-row items-start md:items-center mb-2">
                                      <h1 className="text-2xl w-fit md:w-4/5 h-full font-bold text-black/80 opacity-80">
                                          {item.nama_jenjang}
                                      </h1>
                                      <div className="w-1/2 md:w-1/5 h-full flex gap-2">
                                          <button className="h-full w-1/2 rounded-md border border-abu-bs hover:bg-abu-bs hover:border-black hover:text-white">
                                              Edit
                                          </button>
                                          <button className="h-full w-1/2 bg-merah-bs text-white rounded-md border border-abu-bs">
                                              Tambah
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
            <FormJenjang handleTambahJenjang={handleTambahJenjang} />
        </>
    );
}
