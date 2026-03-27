import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export async function loginRequest(username, password) {
    const response = await axios.post(`${BASE_URL}/v1/auth/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
}