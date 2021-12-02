const express = require('express');
const bcrypt = require('bcrypt');
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
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (!username || !password) {
      res
        .status(400)
        .json({ message: 'Please provide a username and password' });
    } else {
      const user = await User.insert({ username, password: hashedPassword });
      res.status(201).json(user);
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

// DELETE /api/users/:id
server.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.remove(id);
    if (!deletedUser) {
      res.status(404).json({ message: `User by id ${id} not found` });
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/login
server.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    const validPassword = bcrypt.compareSync(password, user.password);
    if (user.username === username && validPassword) {
      res.status(200).json({ message: `Welcome ${user.username}` });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server;
