import supertest from 'supertest';
import chai from 'chai';
import uuid from 'node-uuid';
import redis from 'redis';
import app from '../index.js';
import config from '../config.js';

global.config = config;
global.app = app;
global.uuid = uuid;
global.db = redis.createClient(config.redis);
global.expect = chai.expect;
global.request = supertest(app);
