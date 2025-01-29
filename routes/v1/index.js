const express  = require("express");
const UserRoutes = require('./users.route');
const AuthRoutes = require('./auth.route')
const router = express.Router();
const ProviderRoute = require('./Provider.route');
const FeedBackRoute =  require('./Feedback.route');
const AppointmentRoute = require('./Appointment.route')


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
      path: '/provider',
      route: ProviderRoute
    },
    {
      path: '/appointment',
      route: AppointmentRoute
    },
    {
      path: '/feedback',
      route: FeedBackRoute
    },
  ];

  defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

  module.exports = router