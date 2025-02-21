const express = require('express');
const router = express.Router();

router.use(express.json())

let db = new Map();
let id = 1;

router
    .route('/')
    .get((req , res) => {
        let {userId} = req.body;
        let channels = []

        if( db.size !== 0 && userId != undefined ){
            db.forEach(function(value , key){
                if(value.userId === userId){
                    channels.push(value)
                }
            })
            if(channels.length != 0){
                res.status(200).json(channels);
            }else{
                notFoundChannel();
            }
        }else{
            notFoundChannel();
        }
    })  // 채널 전체 조회
    .post((req , res) => {
        console.log(req.body.channelTitle)
        if ( req.body.channelTitle ){
            let channel = req.body;
            db.set(id++, channel);
    
            res.status(201).json({
                message : `${db.get(id-1).channelTitle} 채널 생성되었습니다.`
            })
        }else{
            res.status(400).json({
                message : "잘못된 요청입니다."
            })
        }
    }) // 채널 개별 생성


router
    .route('/:id')
    .get((req , res) => {
        let {id} = req.params;
        id = parseInt(id);
        let channel = db.get(id);

        if(channel != undefined ){
            res.status(200).json(channel)
        }else{
            notFoundChannel();
        }
    })  // 채널 개별 조회
    .put((req , res) => {
        let {id} = req.params;
        id = parseInt(id);

        let channel = db.get(id);
        let oldTitle = channel.channelTitle;

        if(channel){
            let newTitle = req.body.channelTitle;
            channel.channelTitle = newTitle;

            db.set(id, channel);
            res.status(200).json({
                message : `${oldTitle}에서 ${newTitle}로 채널명이 바뀌었습니다.`
            })
        }else{
            notFoundChannel();
        }

        res.send("개별 수정")
    })  // 채널 개별 수정
    .delete((req , res) => {
        let {id} = req.params;
        id = parseInt(id);

        let channel = db.get(id);
        let channelTitle = channel.channelTitle;
        if(channel){
            db.delete(id);

            res.status(200).json({
                message : `${channelTitle} 채널이 삭제되었습니다.`
            })
        }else{
            notFoundChannel();
        }
    })   // 채널 개별 삭제

function notFoundChannel(){
    res.status(404).json({
        message : "채널 정보를 찾을 수 없습니다."
    })
}

module.exports = router;