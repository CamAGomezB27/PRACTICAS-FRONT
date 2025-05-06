import React from "react";
import LoginForm from "../components/LoginForm";
import Franco from "../assets/Franco.png";
import Logo_casa_colaborador from "../assets/Casa_Colaborador.png";
import Trabajadores from "../assets/Trabajadores.png";
import Logo_Home from "../assets/Logo_home.png";

const LoginPage: React.FC = () => {
    const handleLogin = (email: string, idToken: string) => {
        console.log("Login Exitoso con:", email, idToken);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 w-screen overflow-x-hidden">
            {/* Contenedor principal - ocupa todo el ancho disponible */}
            <div className="flex flex-col items-center justify-between py-6 flex-grow">
                {/* Logo Casa del Colaborador */}
                <div className="w-full flex justify-center mb-6">
                    <img 
                        src={Logo_casa_colaborador} 
                        alt="Logo Casa del Colaborador" 
                        className="h-12 object-contain" 
                    />
                </div>

                {/* Contenido principal con ancho controlado */}
                <div className="flex w-full max-w-4xl mx-auto items-center justify-between px-6">
                    {/* Franco */}
                    <div className="w-1/5 flex justify-center">
                        <img 
                            src={Franco} 
                            alt="Franco" 
                            className="w-full max-w-[140px] h-auto object-contain" 
                        />
                    </div>

                    {/* FORMULARIO */}
                    <div className="w-3/5 bg-[#4669AF] p-6 rounded-md text-center space-y-4 shadow-lg">
                        <h2 className="text-lg font-bold text-white">
                            Bienvenido(a) aquí podrás gestionar tus diferentes procesos de Nómina
                        </h2>

                        <LoginForm onGoogleLogin={handleLogin} />

                        <div className="mt-4 space-y-2 text-blue-100">
                            <p className="hover:underline cursor-pointer">
                                ¿Tienes dudas del portal? <br />
                                <span className="text-blue-200">Resuélvelas aquí</span>
                            </p>
                            <p className="hover:underline cursor-pointer">
                                ¿No logras ingresar? <br />
                                <span className="text-blue-200">Crear caso con soporte SODI</span>
                            </p>
                        </div>
                    </div>

                    {/* TRABAJADORES */}
                    <div className="w-1/5 flex justify-center">
                        <img 
                            src={Trabajadores} 
                            alt="Trabajadores" 
                            className="w-full max-w-[140px] h-auto object-contain" 
                        />
                    </div>
                </div>

                {/* LOGO HOMECENTER */}
                <div className="w-full flex justify-center mt-auto pt-8">
                    <img 
                        src={Logo_Home} 
                        alt="Logo Homecenter" 
                        className="h-8 object-contain" 
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;