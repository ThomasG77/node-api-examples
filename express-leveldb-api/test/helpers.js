import supertest from 'supertest';
import chai from 'chai';
import uuid from 'node-uuid';
import async from 'async';
import app from '../index.js';
import config from '../config.js';

global.config = config;
global.uuid = uuid;
global.app = app;
global.async = async;
global.expect = chai.expect;
global.request = supertest(app);
