import React from "react";
import SideBar from "../Components/SideBar";
import TabelTestimoni from "../Components/TabelTestimoni";
import TableSiswa from "../Components/TableSiswa";

export default function KelolaTestimoni() {
    return (
        <div className="w-full md:w-screen md:h-screen md:flex p-2 pb-16 md:p-0">
            <SideBar />
            <TabelTestimoni />
        </div>
    );
}
