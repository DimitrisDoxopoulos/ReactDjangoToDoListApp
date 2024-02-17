import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchToDos = async () => {
    try {
        return await axios.get(`${API_BASE_URL}/notes/`);
    } catch (error) {
        console.error('Error fetching todos: ', error);
        throw error;
    }
};

export const postTodo = async (toDo) => {
    try {
        return await axios.post(`${API_BASE_URL}/notes/`, toDo);
    } catch (error) {
        console.error('Error posting todos: ', error);
        throw error;
    }
}