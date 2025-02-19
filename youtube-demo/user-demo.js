const express = require("express");
const app = express();

app.listen(1234);
app.use(express.json())

let db = new Map(); //key - value 쌍 , json과 유사
let id = 1;

// 로그인
app.post('/login', (req, res) => {
    
})

// 회원가입
app.post('/join', (req, res) => {
    if( req.body == {} ){
        res.status(400).json({
            message : "요청 값이 잘못되었습니다."
        });
    }else{
        console.log(req.body)
        db.set(id++, req.body)
    
        res.status(201).json({
            message : `${db.get(id-1).name} 님의 유튜브 활동을 응원합니다.`
        });
    }
})

// 회원 개별 조회
app.get('/users/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const user = db.get(id);
    if (user == undefined){
        res.status(404).json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    }else{
        res.status(200).json({
            userId : user.userId,
            name : user.name
        })
    }
})

// 회원 개별 탈퇴
app.delete('/users/:id', (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const user = db.get(id);
    if (user == undefined){
        res.status(404).json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    }else{
        db.delete(id);
        res.status(200).json({
            message : `${user.name}님 다음에 또 뵙겠습니다.`
        })
    }

})