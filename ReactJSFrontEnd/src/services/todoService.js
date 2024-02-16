import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchToDos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/notes/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos: ', error);
        throw error;
    }
};