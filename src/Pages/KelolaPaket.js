import React from "react";
import FormJenjang from "../Components/FormJenjang";
import SideBar from "../Components/SideBar";
import TabelPaket from "../Components/TabelPaket";
import TableSiswa from "../Components/TableSiswa";

export default function KelolaPaket() {
    return (
        <div className="w-full md:w-screen md:h-screen md:flex p-2 pb-16 md:p-0">
            <SideBar />
            <TabelPaket />
            {/* <FormJenjang /> */}
        </div>
    );
}
