import React, { useState, createContext } from "react";

export const PaketContext = createContext();

export const PaketProvider = (props) => {
    const [jenjangItem, setJenjangItem] = useState({
        nama_jenjang: "",
        akronim: "",
        deskripsi: "",
    });
    const [show, setShow] = useState(false);
    const [formPurpose, setFormPurpose] = useState("Simpan");

    return (
        <PaketContext.Provider
            value={{
                jenjangItem,
                setJenjangItem,
                show,
                setShow,
                formPurpose,
                setFormPurpose,
            }}
        >
            {props.children}
        </PaketContext.Provider>
    );
};
