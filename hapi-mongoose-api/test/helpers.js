import chai from 'chai';
import config from '../config.js';
import server from '../index.js';

global.config = config;
global.expect = chai.expect;
global.server = server;
