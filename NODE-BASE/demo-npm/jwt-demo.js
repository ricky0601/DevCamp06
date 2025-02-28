var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config({path : '../.env'});

// 서명 = 토큰 발행
var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);

console.log(token);

var decoded = jwt.verify(token, process.env.PRIVATE_KEY);

console.log(decoded);