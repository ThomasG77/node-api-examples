import chai from 'chai';
import async from 'async';
import uuid from 'node-uuid';
import db from '../db.js';
import config from '../config.js';
import server from '../index.js';

global.db = db;
global.config = config;
global.async = async;
global.uuid = uuid;
global.expect = chai.expect;
global.server = server;
