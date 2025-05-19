import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="font-bold text-lg">Mi Sitema - Admin</div>
            <ul>
                <li><a href="/dashboard" className="hover:underline"></a>Dashboard</li>
                <li><a href="/perfil" className="hover:underline"></a>Perfil</li>
                <li><a href="/salir" className="hover:underline"></a>Salir</li>
            </ul>
        </nav>
    )
}

export default Navbar