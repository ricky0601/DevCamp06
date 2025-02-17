const express = require("express");
const app = express();
app.listen(1234);

let youtuber1 ={
    channelTitle : "우왁굳",
    sub : "173만명",
    videoNum : "8.2천개"
}

let youtuber2 ={
    channelTitle : "Eagles TV",
    sub : "36.1만명",
    videoNum : "3.5천개"
}

let youtuber3 ={
    channelTitle : "아이네 INE",
    sub : "42.6만명",
    videoNum : "561개"
}

let db = new Map(); //key - value 쌍 , json과 유사
let id = 1;

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

// Rest API 설계
app.get('/youtubers', (req , res) => {
    res.json(db);
})

app.get('/youtuber/:id', function(req,res){
    let {id} = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);
    if (youtuber == undefined){
        res.json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    }else{
        res.json(youtuber)
    }
})

app.use(express.json());    // http 외 모듈인 '미들웨어' : json 설정
app.post('/youtuber' , (req,res) => {
    console.log(req.body);
    
    // 등록..? Map(db)에 저장(set) 해줘야함
    db.set(id++, req.body)

    res.json({
        message : `${db.get(id-1).channelTitle} 님, 유튜버 생활을 응원합니다!`
    });
})