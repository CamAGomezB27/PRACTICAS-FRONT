import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface LoginGoogleFormProps {
  onGoogleLogin: (email: string, idToken: string) => void;
}

interface GoogleJWT {
  email: string;
}

const LoginForm: React.FC<LoginGoogleFormProps> = ({ onGoogleLogin }) => {
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const decoded = jwtDecode<GoogleJWT>(credentialResponse.credential);
        const email = decoded.email;
        const idToken = credentialResponse.credential;
        onGoogleLogin(email, idToken);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  };

  const handleGoogleFailure = () => {
    console.error('Error al iniciar sesión con Google');
  };

  return (
    <>
      {/* Tu botón personalizado */}
      <button
        onClick={() => {
          // Obtiene el botón invisible de Google y simula un clic
          const googleButton = document.querySelector(
            "div[role='button']",
          ) as HTMLButtonElement;
          googleButton?.click(); // Ahora TypeScript sabe que es un HTMLButtonElement
        }}
        className="font-poppins bg-[#B1C5DE] text-black font-bold py-2 px-6 rounded-3xl shadow-md hover:bg-[#A1B1C0] transition duration-300 w-full"
      >
        Iniciar sesión con correo corporativo
      </button>

      {/* Solo rendereamos el GoogleLogin sin el botón visible, lo controlamos con el clic */}
      <div className="hidden">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap={false}
          theme="filled_blue"
          size="large"
          type="standard"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
          width="100%"
          ux_mode="popup"
        />
      </div>
    </>
  );
};

export default LoginForm;
