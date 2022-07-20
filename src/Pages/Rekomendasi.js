import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";

export default function Rekomendasi() {
    const [jenjang, setJenjang] = useState([]);
    const [paket, setPaket] = useState([]);
    const [filterJenjang, setFilterJenjang] = useState(0);
    const [nilai, setNilai] = useState([
        { matematika: 0, indo: 0, ipa: 0 },
        { matematika: 0, indo: 0, ipa: 0 },
    ]);

    const [ranking, setRanking] = useState({
        sem1: 0,
        sem2: 0,
    });

    const [finansial, setFinansial] = useState("");
    const [kebutuhan, setKebutuhan] = useState(1);
    const [showLoad, setShowLoad] = useState(false);

    const checkNilai = () => {
        let all_nilai = nilai.map((item) => {
            let hasil =
                (parseInt(item.matematika) +
                    parseInt(item.indo) +
                    parseInt(item.ipa)) /
                3;
            return hasil;
        });
        let check = (all_nilai[0] + all_nilai[1]) / 2;
        if (check >= 90) {
            return 1;
        } else if (check >= 80 && check < 90) {
            return 2;
        } else {
            return 3;
        }
    };

    const checkSyaratNilai = (check) => {
        if (check >= 90) {
            return 3;
        } else if (check >= 80 && check < 90) {
            return 2;
        } else {
            return 1;
        }
    };

    const checkRanking = () => {
        if (
            (ranking.sem1 <= 10 && ranking.sem1 >= 1) ||
            (ranking.sem2 <= 10 && ranking.sem2 >= 1)
        ) {
            return 1;
        } else {
            return 2;
        }
    };

    const checkFinansial = () => {
        if (finansial == "murah") {
            return 1;
        } else if (finansial == "biasa/standar") {
            return 2;
        } else {
            return 3;
        }
    };

    const checkKebutuhan = () => {
        return kebutuhan;
    };

    const checkRequireRanking = (angka) => {
        if (angka == 1) {
            return 1;
        } else {
            return 2;
        }
    };

    const checkHarga = (angka) => {
        if (angka >= 0 && angka <= 325000) {
            return 1;
        } else if (angka > 325000 && angka <= 550000) {
            return 2;
        } else {
            return 3;
        }
    };

    const getRekomendasi = () => {
        // Buka Layar Tunggu
        setShowLoad(true);

        let check = [
            checkNilai(),
            checkRanking(),
            checkFinansial(),
            checkKebutuhan(),
        ];
        let penjumlahan_bobot_attribut = check.reduce(function (
            previousValue,
            currentValue
        ) {
            return previousValue + currentValue;
        });

        // Dari Pengguna
        check = check.map((item) => item / penjumlahan_bobot_attribut);
        console.log(check);

        // Dari Paket
        let all_alternatif = paket
            .filter((item) => item.id_jenjang == filterJenjang)
            .map((item) => {
                console.log(item.harga);
                return [
                    checkSyaratNilai(item.min_nilai),
                    checkRequireRanking(item.riwayat_ranking),
                    checkHarga(item.harga),
                    item.fasilitas_ujian == 1 ? 2 : 1,
                    item.nama_paket,
                ];
            });

        console.log(all_alternatif);

        // Menghitung S
        let hasil = [];
        for (let i = 0; i < all_alternatif.length; i++) {
            let total =
                all_alternatif[i][0] ** (check[0] * -1) *
                all_alternatif[i][1] ** (check[1] * -1) *
                all_alternatif[i][2] ** (check[2] * -1) *
                all_alternatif[i][3] ** (check[3] * 1);
            hasil.push(total);
        }

        // Menghitung V
        let penjumlahan_vektor_s = hasil.reduce(function (
            previousValue,
            currentValue
        ) {
            return previousValue + currentValue;
        });
        hasil = hasil.map((item) => item / penjumlahan_vektor_s);
        console.log(
            paket.filter((item) => item.id_jenjang == filterJenjang)[
                _.indexOf(hasil, _.max(hasil))
            ]
        );

        // Tutup Kembali Layar Tunggu
        setShowLoad(false);

        // console.log(paket.filter((item) => item.id_jenjang == filterJenjang));
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/paket-bimbingan`)
            .then((res) => setPaket(res.data.data));

        axios
            .get(`${process.env.REACT_APP_API}/jenjang-pendidikan`)
            .then((res) => setJenjang(res.data.data));
    }, []);
    return (
        <>
            <div
                className={[
                    "w-[100vw] h-[100vh] bg-black/50 items-center justify-center text-white",
                    showLoad ? "flex" : "hidden",
                ].join(" ")}
            >
                Rekomendasi On Progress...
            </div>
            <div className="p-4">
                <h1>Pilih Jenjang Pendidikan</h1>
                <select
                    name=""
                    className="p-2 border border-abu-bs"
                    onChange={(e) => {
                        setFilterJenjang(parseInt(e.target.value));
                    }}
                >
                    {jenjang.map((item) => (
                        <option value={item.id}>{item.nama_jenjang}</option>
                    ))}
                </select>

                <h1>Rekomendasi</h1>
                <p>Semester 1</p>
                <div className="w-full flex gap-4">
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="MTK"
                        className="w-1/3 p-2 border border-abu-bs rounded-md"
                        onChange={(e) => {
                            let nilai_baru = [...nilai];
                            nilai_baru[0].matematika = parseInt(e.target.value);
                            setNilai(nilai_baru);
                        }}
                    />
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="Indo"
                        className="w-1/3 p-2 border border-abu-bs rounded-md"
                        onChange={(e) => {
                            let nilai_baru = [...nilai];
                            nilai_baru[0].indo = parseInt(e.target.value);
                            setNilai(nilai_baru);
                        }}
                    />
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="IPA"
                        className="w-1/3 p-2 border border-abu-bs rounded-md"
                        onChange={(e) => {
                            let nilai_baru = [...nilai];
                            nilai_baru[0].ipa = parseInt(e.target.value);
                            setNilai(nilai_baru);
                        }}
                    />
                </div>

                <p>Semester 2</p>
                <div className="w-full flex gap-4">
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="MTK"
                        className="w-1/3 p-2 border border-abu-bs rounded-md"
                        onChange={(e) => {
                            let nilai_baru = [...nilai];
                            nilai_baru[1].matematika = parseInt(e.target.value);
                            setNilai(nilai_baru);
                        }}
                    />
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="Indo"
                        className="w-1/3 p-2 border border-abu-bs rounded-md"
                        onChange={(e) => {
                            let nilai_baru = [...nilai];
                            nilai_baru[1].indo = parseInt(e.target.value);
                            setNilai(nilai_baru);
                        }}
                    />
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="IPA"
                        className="w-1/3 p-2 border border-abu-bs rounded-md"
                        onChange={(e) => {
                            let nilai_baru = [...nilai];
                            nilai_baru[1].ipa = parseInt(e.target.value);
                            setNilai(nilai_baru);
                        }}
                    />
                </div>

                <p>Kemampuan Finansial</p>
                <p>
                    Apakah membayar 750ribu/Paket Termahal di Bimbel Beta Smart
                    untuk 12 kali pertemuan
                </p>
                <div className="flex gap-4">
                    <input
                        type="radio"
                        name="kemampuan-finansial"
                        id="murah"
                        onClick={(e) => setFinansial("murah")}
                    />
                    <label htmlFor="murah">Murah</label>
                    <input
                        type="radio"
                        name="kemampuan-finansial"
                        id="biasa/standar"
                        onClick={(e) => setFinansial("biasa/standar")}
                    />
                    <label htmlFor="biasa/standar">Biasa / Standar</label>
                    <input
                        type="radio"
                        name="kemampuan-finansial"
                        id="mahal"
                        onClick={(e) => setFinansial("mahal")}
                    />
                    <label htmlFor="mahal">Kemahalan</label>
                </div>

                <p className="mt-4">Kebutuhan</p>
                <p>Tujuan kamu mengikuti kegiatan bimbingan belajar?</p>
                <div className="flex gap-4">
                    <input
                        type="radio"
                        name="tujuan"
                        id="tidak"
                        onClick={(e) => setKebutuhan(1)}
                    />
                    <label htmlFor="tidak">
                        Untuk Memperdalam Ilmu dan Membantu dalam Pelajaran
                    </label>
                    <input
                        type="radio"
                        name="tujuan"
                        id="iya"
                        onClick={(e) => setKebutuhan(2)}
                    />
                    <label htmlFor="iya">
                        Untuk Persiapan Ujian dalam Waktu Dekat
                    </label>
                </div>

                <p className="mt-4">Ranking</p>
                <div className="flex-gap-4">
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="Semester 1"
                        value={ranking.sem1}
                        onChange={(e) =>
                            setRanking({
                                ...ranking,
                                sem1: parseInt(e.target.value),
                            })
                        }
                        className="p-2 border border-abu-bs rounded-md"
                    />
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="Semester 2"
                        value={ranking.sem2}
                        onChange={(e) =>
                            setRanking({
                                ...ranking,
                                sem2: parseInt(e.target.value),
                            })
                        }
                        className="p-2 border border-abu-bs rounded-md"
                    />
                </div>

                <button
                    onClick={getRekomendasi}
                    className="p-2 bg-merah-bs text-white rounded-md"
                >
                    Berikan Rekomendasi!
                </button>
            </div>
        </>
    );
}
