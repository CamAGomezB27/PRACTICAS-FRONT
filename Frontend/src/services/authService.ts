import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginWithGoogle = async (idToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/google`, {
      token: idToken,
    });

    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Error al autenticar con Google:', error);
    throw error;
  }
};

