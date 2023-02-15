const { Router } = require('express');
const { checksRoutes } = require('../components/checks');
const { usersRoutes } = require('../components/users');
const { reportsRoutes } = require('../components/reports');

const router = Router();

// Test Route.
router.get('/test', (req, res) => res.json('A 200 OK package is on the way 📦!'));

router.use('/users', usersRoutes);
router.use('/checks', checksRoutes);
router.use('/reports', reportsRoutes);
module.exports = router;
