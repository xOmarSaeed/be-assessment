const { Router } = require('express');
const { checksRoutes } = require('../components/checks');
const { usersRoutes } = require('../components/users');

const router = Router();

// Test Route.
router.get('/test', (req, res) => res.json("Yay, Server's Working!"));

router.use('/users', usersRoutes);
router.use('/checks', checksRoutes);
module.exports = router;
