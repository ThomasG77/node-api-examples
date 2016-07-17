import chai from 'chai';
import uuid from 'node-uuid';
import db from '../db.js';
import config from '../config.js';
import server from '../index.js';

global.uuid = uuid;
global.redis = db();
global.config = config;
global.expect = chai.expect;
global.server = server;
