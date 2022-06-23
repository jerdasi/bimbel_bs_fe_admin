import React from "react";
import SideBar from "../Components/SideBar";
import Summary from "../Components/Summary";

const Dashboard = () => {
    return (
        <div className="w-full md:w-screen md:h-screen md:flex p-2 pb-16 md:p-0">
            <SideBar />
            <Summary />
        </div>
    );
};

export default Dashboard;
