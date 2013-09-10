#!/bin/env node

var Db 		= require("mongodb").Db,
	Server 	= require("mongodb").Server;

var MyDb = function (hostname, port) {
	this.server = new Server("127.0.0.1", 27017, {});
	this.db_connector =  new Db('test', this.server, {w: 1});
}

MyDb.prototype = {
	insert: function (record, cb) {
		this.db_connector.open (function(err, db){
			if (err) {
				cb (err);
				return;
			}
			db.collection('test_insert', function(err, collection){
				if (err) {
					cb (err);
					return;
				}
				collection.insert (record, function(err, docs) {
					if (err) {
						cb (err);
						return;
					}
					console.log (docs.toString());
					collection.find().toArray(function(err, results) {
						console.log (results);
					})
					cb (null, "insert successfully!");
				})
			});
		});
	}
}

module.exports = MyDb;