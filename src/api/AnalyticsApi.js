import api from './api';

const BASE_URL = 'http://localhost:3000';

export async function getWaterAnalytics() {
    const response = await api.get(`${BASE_URL}/v1/analytics/water`);
    return response.data;
}

export async function getSleepAnalytics() {
    const response = await api.get(`${BASE_URL}/v1/analytics/sleep`);
    return response.data;
}

export async function getTodosAnalytics() {
    const response = await api.get(`${BASE_URL}/v1/analytics/todos`);
    return response.data;
}

export async function getMoodAnalytics() {
    const response = await api.get(`${BASE_URL}/v1/analytics/mood`);
    return response.data;
}