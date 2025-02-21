const express = require("express");
const router = express.Router();
router.use(express.json())

let db = new Map(); //key - value 쌍 , json과 유사
let id = 1;

// 로그인
router.post('/login', (req, res) => {
    console.log(req.body)   // id, pwd

    // id가 db에 저장된 회원인지 확인하기
    const {userId , password} = req.body;

    let hasUserId = false;
    let loginUser = {};

    db.forEach((user , id) => {
        if(user.userId === userId){
            loginUser = user;
        }
    })

    if(!isEmpty(loginUser)){
        if ( loginUser.pwd === password ){
            res.status(200).json({
                message : `${loginUser.name}님 로그인 성공하셨습니다.`
            })
        }else{
            res.status(400).json({
                message : `잘못된 패스워드입니다.`
            })
        }
    }else{
        res.status(404).json({
            message : `입력하신 아이디는 없는 아이디 입니다.`
        })
    }
})

function isEmpty(obj){
    if(Object.keys(obj).length === 0){
        return true;
    }else{
        return false;
    }
}

// 회원가입
router.post('/join', (req, res) => {
    if( req.body == {} ){
        res.status(400).json({
            message : "요청 값이 잘못되었습니다."
        });
    }else{
        let {userId} = req.body;

        db.set(userId, req.body)
    
        res.status(201).json({
            message : `${db.get(userId).name} 님의 유튜브 활동을 응원합니다.`
        });
    }
})

// 회원 개별 조회
router.get('/users', (req, res) => {
    let {userId} = req.body;

    const user = db.get(userId);
    if (user != undefined){
        res.status(200).json({
            userId : user.userId,
            name : user.name
        })
    }else{
        res.status(404).json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    }
})

// 회원 개별 탈퇴
router.delete('/users', (req, res) => {
    let {userId} = req.body;

    const user = db.get(userId);
    if (user != undefined){
        db.delete(userId);
        res.status(200).json({
            message : `${user.name}님 계정이 성공적으로 삭제되었습니다.`
        })
    }else{
        res.status(404).json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    }

})

module.exports = router;