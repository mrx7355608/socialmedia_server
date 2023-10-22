const users = [];

const mockUserDB = {
  insert: (data) => data,
  // eslint-disable-next-line no-unused-vars
  findByEmail: (email) => true,
  findAll: () => users,
};

export default mockUserDB;
