import React from "react";
import SideBar from "../Components/SideBar";
import TabelPaket from "../Components/TabelPaket";
import { PaketProvider } from "../Context/PaketBimbingan";

export default function KelolaPaket() {
    return (
        <PaketProvider>
            <div className="w-full md:w-screen md:h-screen md:flex p-2 pb-16 md:p-0">
                <SideBar />
                <TabelPaket />
            </div>
        </PaketProvider>
    );
}
