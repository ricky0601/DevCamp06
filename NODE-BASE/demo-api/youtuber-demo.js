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
    db.forEach(function(youtuber){
        console.log(youtuber);
    })

    var jsonObject = {}
    db.forEach(function(value , key){
        jsonObject[key] = value;
    })

    res.json(jsonObject);
})

app.get('/youtubers/:id', function(req,res){
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
app.post('/youtubers' , (req,res) => {
    console.log(req.body);
    
    // 등록..? Map(db)에 저장(set) 해줘야함
    db.set(id++, req.body)

    res.json({
        message : `${db.get(id-1).channelTitle} 님의 유튜브 활동을 응원합니다.`
    });
})

app.delete('/youtubers/:id', (req , res) => {
    let {id} = req.params;
    id = parseInt(id);

    var youtuber = db.get(id);

    if( youtuber == undefined ){
        res.json({
            message : `요청하신 ${id} 유튜버 정보를 찾을 수 없습니다.`
        })
    }else{
        const channelTitle = youtuber.channelTitle;
    
        db.delete(id);
    
        res.json({
            message : `${channelTitle}님, 다음에 또 뵙길 바랍니다.`
        })
    }
})

app.delete('/youtubers', (req, res) => {

    if(db.size >= 1){
        db.clear();
        
        res.json({
            message: `전체 유튜버가 삭제되었습니다.`
        })
    }else{
        res.json({
            message: `삭제할 유튜버가 없습니다.`
        })
    }
})

app.put('/youtubers/:id' , (req, res) =>{
    let {id} = req.params;
    id = parseInt(id);

    let youtuber = db.get(id);
    let oldTitle = youtuber.channelTitle;
    if (youtuber == undefined){
        res.json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    }else{
        let newTitle = req.body.channelTitle;
        youtuber.channelTitle = newTitle;

        db.set(id , youtuber)

        res.json({
            message : `${oldTitle}님, 채널명이 ${newTitle}로 변경되었습니다.`
        })
    }

})