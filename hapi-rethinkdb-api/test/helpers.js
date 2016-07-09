import chai from 'chai';
import r from 'rethinkdb';
import db from '../helpers/db.js'
import server from '../index.js';

global.r = r;
global.db = db;
global.expect = chai.expect;
global.server = server;
