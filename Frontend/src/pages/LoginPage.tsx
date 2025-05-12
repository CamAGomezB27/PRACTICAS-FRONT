import React from "react";
import LoginForm from "../components/Form_Login/LoginForm";
import Franco from "../assets/images/Franco.png";
import Trabajadores from "../assets/images/Trabajadores.png";
import Logo_Home from "../assets/logos/Logo_home.png";
import { loginWithGoogle } from "../services/authService";

const LoginPage: React.FC = () => {
    const handleLogin = (email: string, idToken: string) => {
        console.log("Login Exitoso con:", email, idToken);

        loginWithGoogle(idToken)
        .then((data) => {
            {/* Se guarda JWT en localStorage */}
            localStorage.setItem('token', data.token) //Se almacena token

            console.log("Usuario autenticado desde el backend:", data )
        })
        .catch((error) => {
            console.error("Error en el login con Google:", error)
        })
    };

    return (
        <div className="relative min-h-screen w-screen bg-gray-200 overflow-hidden">
            {/* FONDO */}
            <div className="absolute inset-0 z-0">
                {/* IMAGENES */}

                {/* LOGO HOME */}
                <img 
                src={Logo_Home} 
                alt="Logo Homecenter" 
                className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[150px] object-contain" 
                />
                {/* FRANCO */}
                <img 
                src={Franco} 
                alt="Franco" 
                className="absolute left-[-140px] top-1/2 transfotrm -translate-y-1/2 w-[500px] object-contain"
                />
                {/* TRABAJADORES */}
                <img 
                src={Trabajadores} 
                alt="Trabajadores" 
                className="absolute right-[0px] top-1/2 transform -translate-y-1/2 w-[375px] object-contain"
                />
            </div>

            {/* CONTENEDOR DEL FORMULARIO */}
            <div className="font-poppins relative z-10 flex items-center justify-center min-h-screen px-4">
                {/* FORMULARIO */}
                <div className="bg-[#4669AF] p-10 rounded-3xl text-center space-y-6 shadow-2xl transform transition duration-300 hover:scale-105 w-full max-w-lg">
                    <h2 className="text-xl font-bold text-white">
                    Bienvenido(a), aquí podrás gestionar tus diferentes procesos de Nómina
                    </h2>

                    <LoginForm onGoogleLogin={handleLogin} />

                    <div className="space-y-3 text-white">
                        <p className="cursor-pointer font-bold hover:text-gray-200 transition duration-300">
                            ¿Tienes dudas del portal? <br />
                            <span className="font-normal text-white text-sm">Resuélvelas aquí</span>
                        </p>
                        <p className="cursor-pointer font-bold hover:text-gray-200 transition duration-300">
                            ¿No logras ingresar? <br />
                            <span className="font-normal text-white text-sm">Crear caso con soporte SODI</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;