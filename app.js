var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const routes = require('./routes');
const routeFactory = require('./routes/routeFactory');
const appSingleton = require('./appSingleton');

const { produceRoute } = routeFactory

var app = appSingleton.getInstance();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


routes.forEach((routeData) => {
  produceRoute(routeData)
})

module.exports = app;
