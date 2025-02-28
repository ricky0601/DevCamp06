const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path : '../.env'});

console.log(process.env.PORT)

//서버 세팅 : 포트 넘버(번호) 1234로 세팅
app.listen(process.env.PORT);

// GET + "/"
app.get('/', (req, res)=> {
    res.send("Hello world");
});

let nodejsBook = {
    title: "Node.js를 공부해보자.",
    price: 20000,
    description: "이 책은 공부하기 좋다."
};

app.get('/product/1' , (req, res)=>{
    res.json(nodejsBook);
});