const { nanoid } = require('nanoid');

function getId() {
  return nanoid().slice(0, 5);
}

let users = [
  { id: getId(), name: 'lambda', password: 'school' },
  { id: getId(), name: 'ethan', password: 'hunt' },
  { id: getId(), name: 'james', password: 'bond' },
  { id: getId(), name: 'jason', password: 'bourne' },
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

  async insert({ name, password }) {
    // INSERT INTO users (id, name, password) VALUES (?, ?, ?)
    const newUser = { id: getId(), name, password };
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
