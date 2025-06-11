import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

export const loginWithGoogle = async (idToken: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/google`,
      { token: idToken },
      { withCredentials: true }, //Cookie
    );

    //Se regresa usuario e información
    return response.data;
  } catch (error) {
    console.error('Error al autenticar con Google:', error);
    throw error;
  }
};
