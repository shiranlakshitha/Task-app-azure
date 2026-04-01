import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getTasks = () => api.get('/tasks');
export const createTask = (task: { title: string; description?: string }) => api.post('/tasks', task);
export const updateTask = (id: string, task: { title?: string; description?: string; completed?: boolean }) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);

export default api;
