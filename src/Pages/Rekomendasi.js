import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Rekomendasi() {
    const [paket, setPaket] = useState([]);
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

    const checkRanking = () => {
        if (ranking.sem1 || ranking.sem2) {
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

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/paket-bimbingan`)
            .then((res) => setPaket(res.data.data));

        console.log((80 + 75 + 75) / 3);
    }, []);
    return (
        <div className="p-4">
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

            <button>Berikan Rekomendasi!</button>
        </div>
    );
}
