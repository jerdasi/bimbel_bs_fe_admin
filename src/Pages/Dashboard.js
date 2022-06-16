import React from 'react';
import SideBar from '../Components/SideBar';
import Summary from '../Components/Summary';

const Dashboard = () => {
    return (
        <div className='w-screen h-screen flex'>
            <SideBar />
            <Summary />
        </div>
    );
}

export default Dashboard;
