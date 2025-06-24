// src/App.js
import { Analytics } from "@vercel/analytics/react"
import React, { useEffect, useState } from 'react';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from './TaskService';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    getAllTasks().then(res => setTasks(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { ...form, completed: false };

    if (editingId) {
      updateTask(editingId, taskData).then(() => {
        setEditingId(null);
        setForm({ title: '', description: '' });
        fetchTasks();
      });
    } else {
      createTask(taskData).then(() => {
        setForm({ title: '', description: '' });
        fetchTasks();
      });
    }
  };

  const handleDelete = (id) => {
    deleteTask(id).then(fetchTasks);
  };

  const handleToggleComplete = (task) => {
    updateTask(task.id, { ...task, completed: !task.completed }).then(fetchTasks);
  };

  return (
    
    <div className="App">
      <h1>📝 Task Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update Task' : 'Add Task'}</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => handleToggleComplete(task)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDelete(task.id)}>❌</button>
            <button onClick={() => {
  setForm({ title: task.title, description: task.description });
  setEditingId(task.id);
}}>
  ✏️ Edit
</button>
          </li>
        ))}
      </ul>
       <Analytics />
    </div>
  );
}

export default App;
