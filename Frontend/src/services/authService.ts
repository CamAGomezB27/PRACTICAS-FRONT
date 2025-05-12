import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginWithGoogle = async (idToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/google`, {
      token: idToken,
    });
    // Suponiendo que el backend devuelve un objeto con la información del usuario
    const userData = response.data.user;
    return userData; // Devuelve los datos del usuario autenticado
  } catch (error) {
    console.error('Error al autenticar con Google:', error);
    throw error;
  }
};
