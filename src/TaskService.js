// src/TaskService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/api/tasks';

export const getAllTasks = () => axios.get(BASE_URL);
export const createTask = (task) => axios.post(BASE_URL, task);
export const updateTask = (id, task) => axios.put(`${BASE_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${BASE_URL}/${id}`);
