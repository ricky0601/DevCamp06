const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator');

router.use(express.json())

const validate = ( req, res, next ) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }else{
        return res.status(400).json({ errors: errors.array() });
    }
}

router
    .route('/')
    .get(
        [
            body('user_id').notEmpty().isInt().withMessage('숫자를 입력해주세요.'),
            validate
        ]
        ,(req , res) => {
            const {user_id} = req.body;
            const sql = `SELECT * FROM channels WHERE user_id = ?`

            conn.query( sql, user_id,
                function(err, results){
                    if(err){
                        console.log(err);
                        return res.status(400).json({
                            message: err
                        });
                    }
                    console.log(results);

                    if(results.length){
                        res.status(200).json(results);
                    }else{
                        res.status(404).json({
                            message : "채널 정보를 찾을 수 없습니다."
                        })
                    }
                }
            )
    })
    .post(
        [
            body('user_id').notEmpty().isInt().withMessage('숫자를 입력해주세요.'),
            body('name').notEmpty().isString().withMessage('문자열을 입력해주세요.'),
            validate
        ]
        ,(req , res) => {
            const {name, user_id} = req.body;
            const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`
            const values = [name, user_id]
            conn.query(sql, values,  
                function (err, results) {
                    if(err){
                        return res.status(400).json({
                            message: err
                        });
                    }
                    res.status(201).json(results);
                }
            );
    })


router
    .route('/:id')
    .get(
        [
            param('id').notEmpty().withMessage('숫자를 입력해주세요.'),
            validate
        ]
        ,(req , res) => {
            let {id} = req.params;
            id = parseInt(id);

            let sql = `SELECT * FROM channels WHERE id = ?`;
            conn.query(sql, id,
                function(err, results){
                    if(err){
                        return res.status(400).json({
                            message: err
                        });
                    }
                    if (results.length){
                        res.status(200).json(results);
                    }else{
                        res.status(404).json({
                            message : "채널 정보를 찾을 수 없습니다."
                        })
                    }
                }
            );
    })
    .put(
        [
            param('id').notEmpty().withMessage('숫자를 입력해주세요'),
            body('name').notEmpty().isString().withMessage('수정할 채널명을 다시 확인해주세요.'),
            validate
        ]
        ,(req , res) => {
            let { id } = req.params;
            id = parseInt(id);
    
            let { name } = req.body;
    
            const sql = `UPDATE channels SET name = ? WHERE id = ?`;
            let values = [name, id];
    
            conn.query(sql, values, (err, results) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }
    
                if (results.affectedRows === 0) {
                    return res.status(400).json({
                        message: "채널 정보를 찾을 수 없습니다.",
                    });
                } else {
                    res.status(200).json(results);
                }
            });
        })
    .delete(
        [
            param('id').notEmpty().withMessage('id 값을 확인해주세요.'),
            validate
        ]
        ,(req , res) => {
            let { id } = req.params;
            id = parseInt(id);
            const sql = `DELETE FROM channels WHERE id = ?`;

            conn.query(sql, id, (err, results) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }

                if (results.affectedRows === 0) {
                    return res.status(400).json({
                        message: "채널 정보를 찾을 수 없습니다.",
                    });
                } else {
                    res.status(200).json(results);
                }
            });
    })

module.exports = router;