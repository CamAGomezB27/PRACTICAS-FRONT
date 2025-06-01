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

const DashboardJefe: React.Fc = () => {
    const { user } = useAuth()

    return(
        <div className='min-h-screen w-screen flex flex-col bg-white'>
        <Navbar 
            panelTitle='Jefe Tienda Calle 80'
            userRoleTitle='Jefe Tienda'
        />

        <Footer />
        </div>
    )

}

export default DashboardJefe