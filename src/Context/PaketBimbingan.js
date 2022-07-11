import React, { useState, createContext } from "react";

export const PaketContext = createContext();

export const PaketProvider = (props) => {
    const [jenjangItem, setJenjangItem] = useState({
        nama_jenjang: "",
        akronim: "",
        deskripsi: "",
    });
    const [paketItem, setPaketItem] = useState({
        nama_paket: "",
        id_jenjang: 0,
        jumlah_pertemuan: 0,
        deskripsi: "",
        harga: 0,
    });
    const [showJenjang, setShowJenjang] = useState(false);
    const [showPaket, setShowPaket] = useState(false);
    const [formPurpose, setFormPurpose] = useState("Simpan");
    const [jenjang, setJenjang] = useState([]);
    const [paketBimbingan, setPaketBimbingan] = useState([]);

    return (
        <PaketContext.Provider
            value={{
                jenjang,
                setJenjang,
                paketBimbingan,
                setPaketBimbingan,
                jenjangItem,
                setJenjangItem,
                paketItem,
                setPaketItem,
                showJenjang,
                setShowJenjang,
                showPaket,
                setShowPaket,
                formPurpose,
                setFormPurpose,
            }}
        >
            {props.children}
        </PaketContext.Provider>
    );
};
