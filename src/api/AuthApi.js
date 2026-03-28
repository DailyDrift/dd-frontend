import api from './api';

const BASE_URL = 'http://localhost:3000';

export async function loginRequest(username, password) {
    const response = await api.post(`${BASE_URL}/v1/auth/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
}

export const registerRequest = async (username, password) => {
    try {
        const response = await api.post(`${BASE_URL}/v1/auth/register`,
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (err) {
        const data = err.response?.data;
        const msg = Array.isArray(data?.message) ? data.message[0] : data?.message;
        throw new Error(msg || "Registrierung fehlgeschlagen.");
    }
};

export async function getMeRequest() {
    const response = await api.get(`${BASE_URL}/v1/user/me`);
    return response.data;
}