const express = require('express');
const User = require('./users/users-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});

// GET /api/users
server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/:id
server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/register
server.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Please provide username and password' });
    } else {
      const user = await User.insert({ username, password });
      res.status(201).json({ id: user.id, username: user.username });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/:id
server.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const updatedUser = await User.update(id, { username, password });
    if (!updatedUser) {
      res.status(404).json({ message: `User by id ${id} not found` });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server;
