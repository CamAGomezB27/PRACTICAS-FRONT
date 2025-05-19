import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const DashboardAdministrador: React.FC = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-6 bg-gray-50">
                <h1 className="text-3xl font-bold mb-4"> Panel Administrador </h1>
                <p> Bienvenido, administrador. Aqui puedes gestionar todo el sistema.</p>
                {/* CONTENIDO */}
            </main>
            <Footer />
        </div>
    )
}

export default DashboardAdministrador