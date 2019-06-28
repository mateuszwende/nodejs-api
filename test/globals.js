/**
 * Global constants
 */
global.chai = require('chai');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

chai.config.includeStack = true;
global.should = chai.should();

global.server = require('../bin/www');

global.goodPassword = 'asdAAS2#1w$%';
global.goodEmail = 'matikkk2222@tlen.pl';
global.badPassword = 'dsaqwe1s';
global.badEmail = 'qwertyqwe.com';
global.goodId = '5cf59e882ea3c36d4d0f631f';
global.badId = '1235124';
global.goodEmailToken = require('randomstring').generate();

global.goodJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiZXN0YmVmb3JlIiwic3ViIjoiNWNmYWRlNTJkYTg1MjYyMzM5NThjOWNjIiwiaWF0IjoxNTU5OTQ0Nzg2MzI4LCJleHAiOjE1NjE2NzI3ODYzMjh9.naCLooObhoRm8dks4_ZFvzVo8K0xQzQZUczuHAxETac';
