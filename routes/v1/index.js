const express  = require("express");
const UserRoutes = require('./users.route');
const AuthRoutes = require('./auth.route')
const router = express.Router();
const DonationRoute = require('./donations.route')

const defaultRoutes = [
  
    {
      path: '/users',
      route: UserRoutes,
    },
    {
      path: '/auth',
      route: AuthRoutes
    },
    {
      path : '/donations',
      route: DonationRoute
    }
  ];

  defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

  module.exports = router