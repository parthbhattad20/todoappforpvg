// Backend: server.js (Express + MongoDB)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 8000;
// const corsOptions = {
//     origin: process.,
//     credentials: true, // This allows cookies to be sent/received
//     optionsSuccessStatus: 200
//   }

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://aura:Parth20@parthdb.douis99.mongodb.net/?retryWrites=true&w=majority&appName=ParthDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Task Schema & Model
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

//http://localhost:5000/tasks/674983e63cd1e7ee3fa7b293

//req.body
//res = 

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const newTask = new Task({ text, completed: false });
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));