import axios from 'axios'

const API_URL = ''

export const loginWithGoogle = async (idToken: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/google`, {
            token: idToken,
        });
        return response.data;
    } catch (error) {
        console.error('Error al autenticar con Google:', error);
        throw error;
    }
}