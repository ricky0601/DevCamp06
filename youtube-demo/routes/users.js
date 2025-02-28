const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const {body, validationResult} = require('express-validator');

// jwt 모듈
const jwt = require('jsonwebtoken');

// dotenv 모듈
const dotenv = require('dotenv').config();

router.use(express.json());

const validate = ( req, res, next ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        return next();
    }
}

router.post(
    '/login',
    [
        body('email').notEmpty().isEmail().withMessage("이메일을 확인해주세요."),
        body('password').notEmpty().isString().withMessage("패스워드를 확인해주세요."),
        validate
    ],
    (req, res) => {
        const {email , password} = req.body;

        let sql = `SELECT * FROM users WHERE email =?`
        conn.query(sql, email,
            function (err, results) {
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        message: err
                    });
                }
                let loginUser = results[0];

                if(loginUser && loginUser.password == password){
                    // token 만들기
                    const token = jwt.sign({
                            email : loginUser.email,
                            name : loginUser.name
                    }, process.env.PRIVATE_KEY, {
                        expiresIn : '1h',
                        issuer : "Donggeon"
                    });
                    res.cookie('token', token, {
                        httpOnly : true
                    });


                    res.status(200).json({
                        message: `${loginUser.name}님 로그인 되었습니다.`,
                    })
                }else{
                    res.status(404).json({
                        message : "이메일 또는 패스워드가 틀렸습니다."
                    })
                }
            }
        );
})

router.post(
    '/join',
    [
        body('email').notEmpty().isEmail().withMessage("이메일을 확인해주세요."),
        body('name').notEmpty().isString().withMessage("이름을 확인해주세요."),
        body('password').notEmpty().isString().withMessage("패스워드를 확인해주세요."),
        body('contact').notEmpty().isString().withMessage("연락처를 확인해주세요."),
        validate
    ],
    (req, res) => {
        const {email, name, password, contact} = req.body;

        let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
        let values = [email,name,password,contact]
        conn.query(sql, values,  
            function (err, results) {
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        message: err
                    });
                }
                res.status(201).json(results);
            }
        );
})

router
    .route('/users')
    .get(
        [
            body('email').notEmpty().isEmail().withMessage("이메일을 확인해주세요."),
            validate
        ],
        (req, res) => {
            let {email} = req.body;
        
            let sql = `SELECT * FROM users WHERE email = ?`;
            conn.query(sql, email,   
                function (err, results) {
                    if(err){
                        console.log(err);
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

    .delete(
        [
            body('email').notEmpty().isEmail().withMessage("이메일을 확인해주세요."),
            validate
        ],
        (req, res) => {
            let {email} = req.body;
        
            let sql = `DELETE FROM users WHERE email = ?`
            conn.query(sql ,email,   
                function (err, results) {
                    if(err){
                        console.log(err);
                        return res.status(400).json({
                            message: err
                        });
                    }

                    if (results.affectedRows === 0) {
                        return res.status(400).json({
                            message: "채널 정보를 찾을 수 없습니다.",
                        });
                    } else {
                        res.status(200).json(results);
                    }
                }
            );

    });

module.exports = router;