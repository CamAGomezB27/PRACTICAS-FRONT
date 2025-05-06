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
        <div className="relative min-h-screen w-screen bg-gray-200 overflow-hidden">
            {/* FONDO */}
            <div className="absolute inset-0 z-0">
                {/* IMAGENES */}

                {/* CASA COLABORADOR */}
                <img 
                src={Logo_casa_colaborador}
                alt="Logo Casa del Colaborador"
                className="absolute top-[-90px] left-1/2 transform -translate-x-1/2 w-[600px] object-contain" 
                />
                {/* LOGO HOME */}
                <img 
                src={Logo_Home} 
                alt="Logo Homecenter" 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[150px] object-contain"
                />
                {/* FRANCO */}
                <img 
                src={Franco} 
                alt="Franco" 
                className="absolute left-[-190px] top-1/2 transfotrm -translate-y-1/2 w-[750px] object-contain"
                />
                {/* TRABAJADORES */}
                <img 
                src={Trabajadores} 
                alt="Trabajadores" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[400px] object-contain"
                />
            </div>

            {/* CONTENEDOR DEL FORMULARIO */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                {/* FORMULARIO */}
                <div className="bg-[#4669AF] p-8 rounded-md text-center space-y-6 shadow-2xl w-full max-w-xl">
                    <h2 className="text-xl font-bold text-white">
                    Bienvenido(a), aquí podrás gestionar tus diferentes procesos de Nómina
                    </h2>

                    <LoginForm onGoogleLogin={handleLogin} />

                    <div className="space-y-2 text-white">
                        <p className="cursor-pointer">
                            ¿Tienes dudas del portal? <br />
                            <span className=" text-white text-sm">Resuélvelas aquí</span>
                        </p>
                        <p className="cursor-pointer">
                            ¿No logras ingresar? <br />
                            <span className=" text-white text-sm">Crear caso con soporte SODI</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;