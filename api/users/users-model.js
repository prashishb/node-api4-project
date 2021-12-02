const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

function getId() {
  return nanoid().slice(0, 5);
}

let users = [
  { id: getId(), username: 'lambda', password: bcrypt.hashSync('school', 10) },
  { id: getId(), username: 'ethan', password: bcrypt.hashSync('hunt', 10) },
  { id: getId(), username: 'james', password: bcrypt.hashSync('bond', 10) },
  { id: getId(), username: 'jason', password: bcrypt.hashSync('bourne', 10) },
];

module.exports = {
  async find() {
    // SELECT * FROM users
    return users;
  },

  async findById(id) {
    // SELECT * FROM users WHERE id = ?
    const user = users.find((user) => user.id === id);
    return user;
  },

  async findByUsername(username) {
    // SELECT * FROM users WHERE username = ?
    const user = users.find((user) => user.username === username);
    return user;
  },

  async insert({ username, password }) {
    // INSERT INTO users (id, name, password) VALUES (?, ?, ?)
    const newUser = { id: getId(), username, password };
    users.push(newUser);
    return newUser;
  },

  async update(id, changes) {
    // UPDATE users SET name = ?, password = ? WHERE id = ?
    const user = users.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    const updatedUser = { ...changes, id };
    users = users.map((user) => (user.id === id ? updatedUser : user));
    return updatedUser;
  },

  async remove(id) {
    // DELETE FROM users WHERE id = ?
    const user = users.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    users = users.filter((user) => user.id !== id);
    return user;
  },
};
