export function getUsers(users) {
  const userList = [];
  if(users) {
    Object.keys(users).forEach(function (key) {
      userList.push(users[key].info)
      // do something with obj
    });
  }
  return userList;
}