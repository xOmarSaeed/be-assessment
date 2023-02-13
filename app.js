const express = require('express');
const config = require('config');
const connectMongoose = require('./config/db');
const routesSettings = require('./config/routesSettings');
const mainErrorHandler = require('./config/mainErrorHandler');
const routes = require('./config/routes');

const app = express();

// Init Routes Settings
routesSettings(app);
app.use(config.get('api.prefix'), routes);

// Connect with MongoDB
connectMongoose();

// Error Handeler (Any error will be propagated to this function to send a resposne):
mainErrorHandler(app);

module.exports = app;
