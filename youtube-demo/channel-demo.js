const express = require('express');
const app = express();
app.use(express.json());
app.listen(1234);

let db = new Map();
let id = 1;

app
    .route('/channels')
    .get((req , res) => {
        var channels = {}

        if( db.size !== 0 ){
            db.forEach(function(value , key){
                channels[key] = value;
            })
        
            res.status(200).json(channels);

        }else{
            res.status(400).json({
                message : "존재하는 채널이 없습니다."
            })
        }
    })  // 채널 전체 조회
    .post((req , res) => {
        console.log(req.body.channelTitle)
        if ( req.body.channelTitle ){
            db.set(id++, req.body)
    
            res.status(201).json({
                message : `${db.get(id-1).channelTitle} 채널 생성되었습니다.`
            })
        }else{
            res.status(400).json({
                message : "잘못된 요청입니다."
            })
        }
    }) // 채널 개별 생성


app
    .route('/channels/:id')
    .get((req , res) => {
        let {id} = req.params;
        id = parseInt(id);
        let channel = db.get(id);

        if(channel == undefined ){
            res.status(404).json({
                message : "없는 데이터"
            })
        }else{
            res.status(200).json(channel)
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
            res.status(404).json({
                message : "잘못된 요청입니다."
            })
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
            res.status(404).json({
                message : "잘못된 요청입니다."
            })
        }
    })   // 채널 개별 삭제
