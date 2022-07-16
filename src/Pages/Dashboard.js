import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Summary from "../Components/Summary";

const Dashboard = () => {
    // const { state } = useLocation();
    // const { id, id_paket } = state;

    // useEffect(() => {
    //     console.log(id, id_paket);
    // }, []);
    return (
        <div className="w-full md:w-screen md:h-screen md:flex p-2 pb-16 md:p-0">
            {/* <p>
                {id}
                {id_paket}
            </p> */}
            <SideBar />
            <Summary />
        </div>
    );
};

export default Dashboard;
