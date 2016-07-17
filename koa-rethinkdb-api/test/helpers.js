import 'babel-polyfill';
import supertest from 'supertest';
import chai from 'chai';
import r from 'rethinkdb';
import app from '../index.js';
import config from '../config.js';

global.r = r;
global.config = config;
global.expect = chai.expect;
global.request = supertest(app.listen());
