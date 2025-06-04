import React from 'react';
// import {
//   FaUsers,
//   FaUserCheck,
//   FaThLarge,
//   FaUserPlus,
//   FaBell,
//   FaUserShield,
// } from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
// import Card from '../../../components/Cards/card';
// import Franco from '../../../assets/images/Franco_Pensando_1-removebg-preview.png';
import { useAuth } from '../../../context/useAuth'; 

const DashboardNomina: React.Fc = () => {
    const { user } = useAuth()

    return(
        <div className='min-h-screen w-screen flex flex-col bg-white'>
        <Navbar 
            panelTitle='NOMINA'
            userRoleTitle={user?.nombre}
        />

        <Footer />
        </div>
    )

}

export default DashboardNomina