const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = `${process.env.PORT}`;
console.log(port);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
// app.post ('/test', (req, res) => {
//     //body에 숨겨져서 들어온 데이터를 화면에 뿌려줘볼까?
//     console.log(req.body.message);

//     res.json(req.body);
// });
app.post ('/test', (req, res) => {
    console.log(req.body);
    res.send("");
});

app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`);
});