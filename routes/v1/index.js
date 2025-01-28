const express  = require("express");
const UserRoutes = require('./users.route');
const AuthRoutes = require('./auth.route')
const router = express.Router();


const defaultRoutes = [
  
    {
      path: '/users',
      route: UserRoutes,
    },
    {
      path: '/auth',
      route: AuthRoutes
    },
   
  ];

  defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

  module.exports = router