import React, { useState} from 'react';

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(email && password){
            onSubmit(email, password)
        }else {
            setError('Por favor, Completa todos los campos')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-sm mx-auto bg-white p-6 rounded-md shadow-wd space-y-4'>
            <div>
                <label className='block text-gray-700 font-bold mb-1'>Email</label>
                <input 
                type="email" 
                value={email}
                placeholder='Escriba su correo'
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>
            <div>
                <label className='block text-gray-700 font-bold mb-1'>Contraseña</label>
                <input 
                type="password" 
                value={password}
                placeholder='Escriba su contraseña'
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full px-4 py-2 border rounded-md focus:outlone-nnone focus:ring-2 focus:ring-blue-500'
                />
            </div>
            {error && <div className='text-red-600 font-semibold'>{error}</div>}
            <button 
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors'
            >
                Iniciar Sesión
            </button>
        </form>
    )
}

export default LoginForm