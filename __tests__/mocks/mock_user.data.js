const users = [];

const mockUserDB = {
  insert: (data) => users.push(data),
  findByEmail: (email) => users.filter((u) => u.email === email)[0],
  findAll: () => users,
};

export default mockUserDB;
