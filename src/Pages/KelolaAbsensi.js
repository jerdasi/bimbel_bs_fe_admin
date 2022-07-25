import React from "react";
import Absensi from "../Components/Absensi";
import SideBar from "../Components/SideBar";
import Loader from "../Components/SmartComponent/Loader";

export default function KelolaAbsensi() {
    return (
        <div className="w-full md:w-screen md:h-screen md:flex p-2 pb-16 md:p-0 relative">
            <SideBar />
            <Absensi />
        </div>
    );
}
