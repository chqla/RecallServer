#!/bin/env node

var restify = require('restify');


var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '*'
});

client.post('/foo', { hello: 'world' }, function(err, req, res, obj) {
  assert.ifError(err);
  console.log('%d -> %j', res.statusCode, res.headers);
  console.log('%j', obj);
});