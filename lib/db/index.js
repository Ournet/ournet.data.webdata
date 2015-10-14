'use strict';

// var mongoose = require('mongoose');
var schemas = require('./schemas');
var core = require('ournet.core');
var Promise = core.Promise;
var models = ['Image', 'TopicTrend', 'Quote'];
var cultures = ['md ro', 'md ru', 'ru ru', 'ro ro', 'bg bg', 'cz cs', 'hu hu', 'it it', 'pl pl', 'in en'];
var utils = require('../utils');
//mongoose.set('debug', true);



module.exports = function(connection) {
  var db = {};
  models.forEach(function(model) {
    var m = db[model] = connection.model(model, schemas[model]);
    Promise.promisifyAll(m);
    Promise.promisifyAll(m.prototype);
  });

  cultures.forEach(function(culture) {
    var model = culture.split(' ');
    model = utils.formatWebSitesTableName(model);
    var m = db[model] = connection.model(model, schemas.WebPage, model);
    Promise.promisifyAll(m);
    Promise.promisifyAll(m.prototype);

    model = culture.split(' ');
    model = utils.formatStoriesTableName(model);
    m = db[model] = connection.model(model, schemas.Story, model);
    Promise.promisifyAll(m);
    Promise.promisifyAll(m.prototype);
  });

  return db;
};