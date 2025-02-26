const express = require('express');
const router = express.Router();
const conn = require('../mariadb');

router.use(express.json())

router
    .route('/')
    .get((req , res) => {
        let {user_id} = req.body;
        let channels = [];

        let sql = `SELECT * FROM channels WHERE user_id = ?`
        if(user_id){
            conn.query( sql, user_id,
                function(err, results){
                    if(results){
                        channels = results;
                    }else{
                        notFoundChannel(res);
                    }
                }
            )
        }else{
            res.status(400).json({
                message: "잘못된 접근"
            });
        }
    })  // 채널 전체 조회
    .post((req , res) => {
        let {name, user_id} = req.body; // name, user_id
        user_id = parseInt(user_id);
        console.log(name + " : " + user_id);
        if(name && user_id){
            let sql = `INSERT INTO users (name, user_id) VALUES (?, ?)`
            let values = [name, user_id]
            conn.query(sql, values,  
                function (err, results) {
                    res.status(201).json(results);
                }
            );

        }else{
            res.status(400).json({
                message: "잘못된 접근"
            })
        }
    }) // 채널 개별 생성


router
    .route('/:id')
    .get((req , res) => {
        let {id} = req.params;
        id = parseInt(id);

        let sql = `SELECT * FROM channels WHERE id = ?`;
        conn.query(sql, id,
            function(err, results){
                if (results.length){
                    res.status(200).json(results);
                }else{
                    notFoundChannel(res);
                }
            }
        );
    })
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
            notFoundChannel(res);
        }
    })   // 채널 개별 삭제

function notFoundChannel(res){
    res.status(404).json({
        message : "채널 정보를 찾을 수 없습니다."
    })
}

module.exports = router;