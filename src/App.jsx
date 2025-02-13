import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/tasks').then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:8000/tasks', { text: newTask }).then((res) => {
      setTasks([...tasks, res.data]);
      setNewTask('');
    });
  };

  const toggleTask = (id) => {
    axios.put(`http://localhost:8000/tasks/${id}`).then((res) => {
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border p-2 flex-grow rounded-l"
            placeholder="Add a task"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 rounded-r">Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center p-2 border-b">
              <span
                onClick={() => toggleTask(task._id)}
                className={task.completed ? 'line-through cursor-pointer' : 'cursor-pointer'}
              >
                {task.text}
              </span>
              <button onClick={() => deleteTask(task._id)} className="text-red-500">X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;