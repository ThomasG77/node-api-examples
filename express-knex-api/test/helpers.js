import supertest from 'supertest';
import chai from 'chai';
import Knex from 'knex';
import app from '../index.js';
import config from '../config.js';

global.config = config;
global.knex = Knex(config.knex);
global.expect = chai.expect;
global.request = supertest(app);
