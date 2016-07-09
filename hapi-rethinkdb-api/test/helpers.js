import chai from 'chai';
import r from 'rethinkdb';
import config from '../config.js'
import server from '../index.js';

global.r = r;
global.config = config;
global.expect = chai.expect;
global.server = server;
