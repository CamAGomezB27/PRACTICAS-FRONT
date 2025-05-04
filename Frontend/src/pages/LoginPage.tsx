import React, { useState } from "react";
import LoginForm from '../components/LoginForm'
import { login } from '../services/authService'

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLoginSubmit = async (email: string, password: string) => {
        setLoading(true)
        try{
            const data = await login(email, password)
            localStorage.setItem('token', data.token)
            setLoading(false)

            console.log('login Exitoso:', data)
        }catch (err) {
            console.error(err)
            setError('Correo o contraseña incorrecta')
            setLoading(false)
        }
    }

    return(
        <div>
            <h1>Iniciar Sesión</h1>
            {error && <div className="text-red-600 font-semibold">{error}</div>}
            <LoginForm onSubmit={handleLoginSubmit}/>
            {loading && <p>Cargando...</p>}
        </div>
    )
}

export default LoginPage