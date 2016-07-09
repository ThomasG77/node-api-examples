import chai from 'chai';
import r from 'rethinkdb';
import server from '../index.js';
import config from '../config.js';

global.config = config;
global.r = r;
global.expect = chai.expect;
global.server = server;
