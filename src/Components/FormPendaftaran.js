import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function FormPendaftaran({
    setDataPendaftaran,
    dataPendaftaran,
    show,
    setShow,
    pendaftar,
}) {
    const [siswa, setSiswa] = useState([]);
    const [paket, setPaket] = useState([]);
    const [grup, setGrup] = useState([]);
    const [jenjang, setJenjang] = useState([]);
    const [guru, setGuru] = useState([]);
    const [operasional, setOperasional] = useState([]);
    const [jadwal, setJadwal] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [hari, setHari] = useState([]);
    const [jam, setJam] = useState([]);
    const [hariGuru, setHariGuru] = useState([]);
    const [jamGuru, setJamGuru] = useState([]);
    const [jenisPaket, setJenisPaket] = useState([]); //Menandak
    const [jadwalGuru, setJadwalGuru] = useState([]);
    const [filteredSiswa, setFilteredSiswa] = useState([]);
    // Ini untuk melakukan pendaftaran
    const [formValue, setFormValue] = useState({
        id_siswa: -1,
        id_grup: -1,
        tanggal_pendaftaran: new Date(),
        total_pembayaran: 0,
        status: "pending",
    });
    // Ini untuk menampung saat memilih nama dari semua pendaftaran siswa
    const [formPendaftaran, setFormPendaftaran] = useState({
        nama_siswa: "",
        id_jenjang: 0,
        id_paket: 0,
        id_grup: 0,
        sudah_bayar: false,
        id_guru: 0,
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/peserta-didik`).then((res) => {
            setSiswa(res.data.data);
            setFilteredSiswa(res.data.data);
        });
        axios
            .get(`${process.env.REACT_APP_API}/grup-bimbel`)
            .then((res) => setGrup(res.data.data));
        axios
            .get(`${process.env.REACT_APP_API}/jenjang-pendidikan`)
            .then((res) => setJenjang(res.data.data));
        axios
            .get(`${process.env.REACT_APP_API}/paket-bimbingan`)
            .then((res) => setPaket(res.data.data));
        axios
            .get(`${process.env.REACT_APP_API}/hari-jam`)
            .then((res) => setOperasional(res.data.data));
        axios
            .get(`${process.env.REACT_APP_API}/guru`)
            .then((res) => setGuru(res.data.data));

        // Jika ada ngirim data berupa id dari parent
        // if()

        // Ini Terjadi Ketika Mengklik Sebuah Paket Bimbingan
        if (formPendaftaran.id_paket != 0) {
            axios
                .get(
                    `${process.env.REACT_APP_API}/paket-bimbingan/${formPendaftaran.id_paket}`
                )
                .then((res) => {
                    setJenisPaket(res.data.data);
                    setJadwal(
                        [...Array(res.data.data.jumlah_pertemuan)].map(
                            (item) => {
                                return { id_hari: 0, id_jam: 0 };
                            }
                        )
                    );
                });
            axios
                .get(
                    `${process.env.REACT_APP_API}/grup-bimbel?paket=${formPendaftaran.id_paket}`
                )
                .then((res) => {
                    // console.log(res.data.data);
                    setGrup(res.data.data);
                });
        }
        // Ini Terjadi apabila memilih seorang guru
        if (formPendaftaran.id_guru != 0) {
            axios
                .get(
                    `${process.env.REACT_APP_API}/waktu-guru?guru=${formPendaftaran.id_guru}`
                )
                .then((res) => {
                    setJadwalGuru(res.data.data);
                    let hari = res.data.data.map((item) => item.id_hari);
                    let jam = res.data.data.map((item) => item.id_jam);
                    setHariGuru([...new Set(hari)]);
                    setJamGuru([...new Set(jam)]);
                    // console.log([...new Set(hari)], [...new Set(jam)]);
                });
        }
    }, [formPendaftaran.id_guru, formPendaftaran.id_paket]);

    const daftarPeserta = (event) => {
        event.preventDefault();
        let requestForm = {
            ...formValue,
            tanggal_pendaftaran: new Date(),
            id_grup: parseInt(formValue.id_grup),
            status: formPendaftaran.sudah_bayar ? "selesai" : "pending",
        };

        if (jenisPaket.kuota != null) {
            //Buat Grup
            //Daftar
        } else {
            axios
                .post(`${process.env.REACT_APP_API}/pendaftaran`, requestForm)
                .then((res) => {
                    console.log(res.data.data.id);
                    //Manggil Secara Manual Biar Data nya Penuh
                    axios
                        .get(
                            `${process.env.REACT_APP_API}/pendaftaran/${res.data.data.id}`
                        )
                        .then((has) => {
                            setDataPendaftaran([
                                ...dataPendaftaran,
                                ...has.data.data,
                            ]);
                            Swal.fire(
                                "Berhasil",
                                "Berhasil Mendaftarkan Peserta Didik Baru",
                                "success"
                            );
                        });

                    handleShow();
                });
        }

        //Ini Jika Ga buat Grup Baru
    };

    const fixJadwal = (toSet) => {
        console.log(
            jadwalGuru.filter(
                (item) =>
                    item.id_hari == toSet.id_hari && item.id_jam == toSet.id_jam
            )[0].id_hari_jam
        );
        if (
            jadwalGuru.filter(
                (item) =>
                    item.id_hari == toSet.id_hari && item.id_jam == toSet.id_jam
            ).length != -1
        ) {
            return true;
        }
        return false;
    };

    // handle Search Nama Siswa
    const handleSearch = (event) => {
        let value = event.target.value;

        setFormPendaftaran({
            ...formPendaftaran,
            nama_siswa: value,
        });

        if (!value) {
            setFilteredSiswa([...siswa]);
        } else {
            let result = [...siswa].filter(
                (item) =>
                    item.nama.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
            setFilteredSiswa(result);
        }
    };

    const handleShow = () => {
        if (show) {
            setFormPendaftaran({
                nama_siswa: "",
                id_jenjang: 0,
                id_paket: 0,
                id_grup: 0,
                sudah_bayar: false,
                id_guru: 0,
            });
            setFormValue({
                id_siswa: -1,
                id_grup: -1,
                tanggal_pendaftaran: new Date(),
                total_pembayaran: 0,
                status: "pending",
            });
        }
        setShow(!show);
    };

    //Function Filter Paket Berdasarkan Jenjang
    const filterPaket = (key) => {
        return paket.filter((item) => item.id_jenjang == parseInt(key));
    };

    //Function Filter Grup Berdasarkan Paket
    const filterGrup = (key) => {
        return grup.filter((item) => item.id_paket == formPendaftaran.id_paket);
    };

    return (
        <div className="">
            <div className="w-1/2 md:w-1/6 inline fixed bottom-20 md:bottom-10 right-4 md:right-10 flex justify-end">
                <button
                    className="w-5/6 bg-merah-bs text-white rounded-lg text-lg flex items-center justify-center p-2"
                    onClick={handleShow}
                >
                    <span className="text-lg mr-2">
                        <i class="fa-solid fa-plus"></i>
                    </span>{" "}
                    Pendaftaran Siswa
                </button>
            </div>
            <div
                className={[
                    "background w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center top-0 left-0 z-50",
                    show ? "absolute" : "hidden",
                ].join(" ")}
            >
                <div className="w-5/6 md:w-1/2 box-form h-3/4 overlow-auto">
                    <form
                        action=""
                        className="border h-full bg-white rounded-lg flex flex-col relative"
                    >
                        <div className="header-form flex items-center relative mb-2 border-b border-abu-bs h-[10%] p-4">
                            <h1 className="text-2xl font-bold text-merah-bs tracking-widest">
                                Tambah Siswa
                            </h1>
                            <div
                                className="close-button text-xl absolute top-0 right-4 cursor-pointer font-bold"
                                onClick={handleShow}
                            >
                                X
                            </div>
                        </div>
                        <div className="body-form h-[80%] overflow-scroll p-4">
                            {/* Siswa */}
                            <div className="row mb-6">
                                <div className="title mb-1">
                                    <p>
                                        Cari Siswa
                                        <span className="text-merah-bs">*</span>
                                    </p>
                                </div>
                                <div className="input-field relative">
                                    <input
                                        type="text"
                                        name="nama_siswa"
                                        id="nama_siswa"
                                        disabled={
                                            formValue.id_siswa != -1
                                                ? true
                                                : false
                                        }
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        placeholder="cth: Bambang Anak Pak Budi"
                                        onChange={(e) => {
                                            handleSearch(e);
                                        }}
                                        value={formPendaftaran.nama_siswa}
                                    />
                                    <div className="absolute bottom-0 right-0 w-8 h-full flex items-center cursor-pointer">
                                        {formValue.id_siswa == -1 && (
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        )}

                                        {formValue.id_siswa != -1 && (
                                            <i
                                                class="fa-solid fa-xmark hover:bg-merah-bs hover:text-white rounded-md p-1"
                                                onClick={(e) => {
                                                    setFormPendaftaran({
                                                        ...formPendaftaran,
                                                        nama_siswa: "",
                                                    });
                                                    setFormValue({
                                                        ...formValue,
                                                        id_siswa: -1,
                                                    });
                                                }}
                                            ></i>
                                        )}
                                    </div>
                                </div>
                                <div className="result-search w-full h-48 border-x border-b border-abu-bs rounded-md p-2 pt-0 overflow-auto">
                                    <h1 className="font-semibold sticky top-0 left-0 backdrop-blur-sm py-2 bg-white/30">
                                        Nama Siswa
                                    </h1>
                                    <ul>
                                        {filteredSiswa.length ? (
                                            filteredSiswa.map((item) => (
                                                <li
                                                    className="p-2 hover:bg-merah-bs hover:text-white hover:rounded-md border-b border-abu-bs"
                                                    onClick={() => {
                                                        setFormPendaftaran({
                                                            ...formPendaftaran,
                                                            nama_siswa:
                                                                item.nama,
                                                            id_jenjang:
                                                                item.id_jenjang,
                                                        });
                                                        setFormValue({
                                                            ...formValue,
                                                            id_siswa: item.id,
                                                        });
                                                    }}
                                                >
                                                    {`${item.nama} - ${item.asal_sekolah}`}
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-center opacity-50">
                                                Tidak ada siswa
                                            </p>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Jenjang */}
                            <div className="row mb-3 flex gap-2 flex-wrap items-end">
                                {/* Jenjang */}
                                <div className="row mb-3 w-full">
                                    <div className="title mb-1">
                                        <p>
                                            Jenjang
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="input-field">
                                        <select
                                            name="jenjang"
                                            id="jenjang"
                                            className="p-2 w-full rounded-md border border-abu-bs"
                                            value={formPendaftaran.id_jenjang}
                                            onChange={(e) =>
                                                setFormPendaftaran({
                                                    ...formPendaftaran,
                                                    id_jenjang: parseInt(
                                                        e.target.value
                                                    ),
                                                    id_paket: 0,
                                                    id_grup: 0,
                                                })
                                            }
                                        >
                                            <option value={0} disabled>
                                                Pilih Salah Satu
                                            </option>
                                            {jenjang.length ? (
                                                jenjang.map((item) => (
                                                    <option value={item.id}>
                                                        {item.nama_jenjang}
                                                    </option>
                                                ))
                                            ) : (
                                                <p>Tidak Tersedia</p>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                {/* Paket */}
                                <div className="row mb-3 flex-1">
                                    <div className="title mb-1">
                                        <p>
                                            Pilihan Paket Bimbingan Belajar
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="input-field">
                                        <select
                                            name="paket"
                                            id="paket"
                                            disabled={
                                                formPendaftaran.id_jenjang == 0
                                                    ? true
                                                    : false
                                            }
                                            className="p-2 border border-abu-bs w-full rounded-md"
                                            onChange={(e) => {
                                                setFormPendaftaran({
                                                    ...formPendaftaran,
                                                    id_paket: parseInt(
                                                        e.target.value
                                                    ),
                                                });
                                                setFormValue({
                                                    ...formValue,
                                                    id_grup: -1,
                                                });
                                            }}
                                            value={formPendaftaran.id_paket}
                                        >
                                            <option value={0} selected disabled>
                                                {filterPaket(
                                                    formPendaftaran.id_jenjang
                                                ).length
                                                    ? "Pilih Salah Satu"
                                                    : "Tidak Tersedia"}
                                            </option>
                                            {filterPaket(
                                                formPendaftaran.id_jenjang
                                            ).map((item) => (
                                                <option value={item.id}>
                                                    {item.nama_paket}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* Grup */}
                                <div className="row mb-3 flex-1">
                                    <div className="title mb-1">
                                        <p>
                                            Pilih Grup
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="input-field">
                                        <select
                                            name="jenjang"
                                            id="jenjang"
                                            className="p-2 border border-abu-bs w-full rounded-md"
                                            disabled={
                                                formPendaftaran.id_paket == 0
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) => {
                                                setFormPendaftaran({
                                                    ...formPendaftaran,
                                                    id_grup: parseInt(
                                                        e.target.value
                                                    ),
                                                });
                                                setFormValue({
                                                    ...formValue,
                                                    id_grup: parseInt(
                                                        e.target.value
                                                    ),
                                                    total_pembayaran:
                                                        paket.filter(
                                                            (item) =>
                                                                item.id ==
                                                                formPendaftaran.id_paket
                                                        )[0]?.harga,
                                                });
                                            }}
                                            value={formPendaftaran.id_grup}
                                        >
                                            <option value={0} selected disabled>
                                                {filterGrup(
                                                    formPendaftaran.id_paket
                                                ).length
                                                    ? "Pilih Salah Satu"
                                                    : "Tidak Tersedia"}
                                            </option>
                                            {filterGrup(
                                                formPendaftaran.id_paket
                                            ).map((item) => (
                                                <option value={item.id}>
                                                    {item.nama_grup}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Muncul Jika Private */}
                            {paket.filter(
                                (item) => item.id == formPendaftaran.id_paket
                            )[0]?.kuota != null && (
                                <div className="row mb-6">
                                    <div className="row mb-3 w-full">
                                        <div className="title mb-1">
                                            <p>Guru</p>
                                        </div>
                                        <div className="w-full h-48 flex flex-col flex-wrap overflow-auto hide-scrollbar box-border">
                                            {guru.map((item) => (
                                                <div
                                                    className={[
                                                        "h-full w-3/5 md:w-1/3 border border-biru-bs rounded-md mr-2 flex justify-center relative group",
                                                        item.id ==
                                                        formValue.id_guru
                                                            ? "shadow border-2 border-merah-bs"
                                                            : "",
                                                    ].join(" ")}
                                                    onClick={(e) =>
                                                        setFormValue({
                                                            ...formValue,
                                                            id_guru: parseInt(
                                                                item.id
                                                            ),
                                                        })
                                                    }
                                                >
                                                    <img
                                                        src={`${process.env.REACT_APP_API}/${item.foto}`}
                                                        alt=""
                                                        className="h-full object-cover rounded-md group-hover:blur-sm"
                                                    />
                                                    <div className="absolute bottom-0 left-0 rounded-b-md w-full p-2 font-bold bg-merah-bs text-white hidden group-hover:block">
                                                        {item.nama}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="title font-bold mt-8 mb-1">
                                        <p>
                                            Atur Jadwal Grup{" "}
                                            <span className="text-merah-bs">
                                                *
                                            </span>
                                        </p>
                                    </div>
                                    <div className="w-full h-32 overflow-auto">
                                        {[
                                            ...Array(
                                                jenisPaket.jumlah_pertemuan
                                            ),
                                        ].map((item, index) => (
                                            <div
                                                className="w-full flex gap-2 mb-1"
                                                disabled={() =>
                                                    fixJadwal(jadwal[index])
                                                }
                                            >
                                                <select
                                                    name="hari_operasional"
                                                    id="hari_operasional"
                                                    className="p-2 w-2/5 rounded-md border border-abu-bs"
                                                    onChange={(e) => {
                                                        let result = [
                                                            ...jadwal,
                                                        ];
                                                        result[index] = {
                                                            ...result[index],
                                                            id_hari: parseInt(
                                                                e.target.value
                                                            ),
                                                        };
                                                        setJadwal(result);
                                                    }}
                                                >
                                                    <option value="all">
                                                        Pilih Hari
                                                    </option>
                                                    {hariGuru.map((item) => (
                                                        <option value={item}>
                                                            {
                                                                hari.filter(
                                                                    (h) =>
                                                                        h.id ==
                                                                        item
                                                                )[0].nama_hari
                                                            }
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    name="hari_operasional"
                                                    id="hari_operasional"
                                                    className="p-2 w-2/5 rounded-md border border-abu-bs"
                                                    onChange={(e) => {
                                                        let result = [
                                                            ...jadwal,
                                                        ];
                                                        result[index] = {
                                                            ...result[index],
                                                            id_jam: parseInt(
                                                                e.target.value
                                                            ),
                                                        };
                                                        setJadwal(result);
                                                    }}
                                                >
                                                    <option value="all">
                                                        Pilih Jam
                                                    </option>
                                                    {jadwalGuru
                                                        .filter(
                                                            (jg) =>
                                                                jg?.id_hari ==
                                                                jadwal[index]
                                                                    ?.id_hari
                                                        )
                                                        .map((jg) => (
                                                            <option
                                                                value={
                                                                    jg.id_jam
                                                                }
                                                            >
                                                                {
                                                                    jam.filter(
                                                                        (j) =>
                                                                            j.id ==
                                                                            jg.id_jam
                                                                    )[0]
                                                                        ?.nama_rentang
                                                                }
                                                            </option>
                                                        ))}
                                                </select>
                                                <button
                                                    className="w-1/5 p-2 rounded-md border border-abu-bs hover:bg-merah-bs hover:text-white"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        fixJadwal(
                                                            jadwal[index]
                                                        );
                                                    }}
                                                >
                                                    Set
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Total */}
                            <div className="row">
                                <div className="title mb-1">
                                    <p>Total Pembayaran</p>
                                </div>
                                <div className="input-field relative">
                                    <input
                                        type="text"
                                        name="pembayaran"
                                        id="pembayaran"
                                        disabled
                                        className="p-2 w-full rounded-md border border-abu-bs"
                                        value={
                                            formPendaftaran.id_paket == 0
                                                ? 0
                                                : paket.filter(
                                                      (item) =>
                                                          item.id ==
                                                          formPendaftaran.id_paket
                                                  )[0]?.harga
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row mb-6">
                                <div className="bayar-field">
                                    <input
                                        type="checkbox"
                                        name="status_bayar"
                                        id="status_bayar"
                                        onChange={(e) => {
                                            setFormPendaftaran({
                                                ...formPendaftaran,
                                                sudah_bayar: e.target.checked,
                                            });
                                        }}
                                        value={formPendaftaran.sudah_bayar}
                                    />{" "}
                                    Sudah Bayar
                                </div>
                            </div>
                        </div>
                        <div className="footer-form w-full h-[10%] flex items-center justify-end bg-biru-bs p-4">
                            <button
                                className="w-1/3 border border-black p-2 rounded-md bg-merah-bs text-white"
                                onClick={(e) => daftarPeserta(e)}
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
