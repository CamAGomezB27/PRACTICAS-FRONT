import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


interface LoginGoogleFormProps {
    onGoogleLogin: (email: string, idToken: string) => void
}

interface GoogleJWT {
    email: string
}

const LoginForm: React.FC<LoginGoogleFormProps> = ({ onGoogleLogin}) => {
    const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            try{
                const decoded = jwtDecode<GoogleJWT>(credentialResponse.credential)
                const email = decoded.email
                const idToken = credentialResponse.credential
                onGoogleLogin(email,idToken)
            } catch (error){
                console.error("Error al decodificar el token", error)
            }
        }
    }

    const handleGoogleFailure = () => {
        console.error("Error al iniciar sesión con Google")
    }

    return (
        <div>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
            />
        </div>
    )
}

export default LoginForm