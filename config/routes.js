const { Router } = require('express');
const { usersRoutes } = require('../components/users');

const router = Router();

// Test Route.
router.get('/test', (req, res) => res.json("Yay, Server's Working!"));

router.use('/users', usersRoutes);
module.exports = router;
