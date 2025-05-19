import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginWithGoogle = async (idToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/google`, {
      token: idToken,
    });
    
    const { token, user } = response.data
    //Token en localStorage
    localStorage.setItem('token', token)
    return user; // Devuelve los datos del usuario autenticado
  } catch (error) {
    console.error('Error al autenticar con Google:', error);
    throw error;
  }
};
