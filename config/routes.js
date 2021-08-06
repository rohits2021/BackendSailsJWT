const UserController = require("../api/controllers/UserController");


module.exports.routes = { 
  '/register': { view: 'register' },
  '/login': { view: 'login' },
  
  
  'GET /user/getalluser': { controller: 'UserController', action: 'getAllUser' },
  'POST /user/register': { controller: 'UserController', action: 'register' },
  'POST /user/login': { controller: 'UserController', action: 'login' },
  'POST /:userId/todos': { controller: 'UserController', action: 'userCreatesTodo' },
  // 'GET /user/home': { controller: 'UserController',action: 'getHome'},

  'POST /todo/create': { controller: 'TodoController', action: 'create' },
  'GET /todo/:userId': { controller: 'TodoController', action: 'userTodo' },
  'PUT /todo/:todoId': { controller: 'TodoController', action: 'updateTodo'},
  'DELETE /todo/:todoId': { controller: 'TodoController', action: 'deleteTodo'},
};
