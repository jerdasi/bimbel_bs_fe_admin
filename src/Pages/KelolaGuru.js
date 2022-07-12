import React from "react";
import SideBar from "../Components/SideBar";
import TableGuru from "../Components/TableGuru";

export default function KelolaGuru() {
    return (
        <div className="w-full md:w-screen md:h-screen md:flex p-2 pb-16 md:p-0">
            <SideBar />
            <TableGuru />
        </div>
    );
}
