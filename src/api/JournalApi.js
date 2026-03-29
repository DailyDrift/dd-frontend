import api from './api';

const BASE_URL = 'http://localhost:3000';

export async function getTodayJournal() {
    const response = await api.get(`${BASE_URL}/v1/journal/today`);
    return response.data;
}

export async function saveTodayJournal(payload) {
    const response = await api.post(`${BASE_URL}/v1/journal/today`, payload);
    return response.data;
}

export async function patchTodo(todoId, patch) {
    const response = await api.patch(`${BASE_URL}/v1/journal/todos/${todoId}`, patch);
    return response.data;
}