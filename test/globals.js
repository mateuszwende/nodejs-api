global.chai = require("chai");
global.chaiHttp = require("chai-http");
chai.use(chaiHttp);
global.server = require("../bin/www");
chai.config.includeStack = true;
global.should = chai.should();

global.correctPassword = "asdAAS2#1w$%";
global.correctEmail = "qwerty@ewq.com";
global.badPassword = "dsaqwe1s";
global.badEmail = "qwertyqwe.com";
global.correctId = "5cf59e882ea3c36d4d0f631f";
global.badId = "1235124";
global.correctEmailToken = require("randomstring").generate();
global.correctJwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiZXN0YmVmb3JlIiwic3ViIjoiNWNmYWRlNTJkYTg1MjYyMzM5NThjOWNjIiwiaWF0IjoxNTU5OTQ0Nzg2MzI4LCJleHAiOjE1NjE2NzI3ODYzMjh9.naCLooObhoRm8dks4_ZFvzVo8K0xQzQZUczuHAxETac";
