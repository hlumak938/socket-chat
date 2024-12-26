const { trimStr } = require('./utils');

let users = [];

const addUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = user.room;

  const isExist = users.find((u) =>
    trimStr(u.name) === userName
    && u.room === userRoom
  );

  !isExist && users.push(user);

  const currentUser = isExist || user;

  return { isExist: !!isExist, user: currentUser };
};

module.exports = { addUser };
