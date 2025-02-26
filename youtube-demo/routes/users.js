const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

router.use(express.json())

router.post('/login', (req, res) => {
    const {email , password} = req.body;

    let sql = `SELECT * FROM users WHERE email =?`
    conn.query(sql, email,
        function (err, results) {
            let loginUser = results[0];

            if(loginUser && loginUser.password == password){
                res.status(200).json({
                    message: `${loginUser.name}님 로그인 되었습니다.`
                })
            }else{
                res.status(404).json({
                    message : "이메일 또는 패스워드가 틀렸습니다."
                })
            }
        }
    );
})

router.post('/join', (req, res) => {
    if( req.body == {} ){
        res.status(400).json({
            message : "요청 값이 잘못되었습니다."
        });
    }else{
        const {email, name, password, contect} = req.body;

        let sql = `INSERT INTO users (email, name, password, contect) VALUES (?, ?, ?, ?)`
        let values = [email,name,password,contect]
        conn.query(sql, values,  
            function (err, results) {
                res.status(201).json(results);
            }
        );
    }
})

router
    .route('/users')
    .get((req, res) => {
        let {email} = req.body;
    
        let sql = `SELECT * FROM users WHERE email = ?`;
        conn.query(sql, email,   
            function (err, results) {
                res.status(200).json(results);
            }
        );
    })

    .delete((req, res) => {
        let {email} = req.body;
    
        let sql = `DELETE FROM users WHERE email = ?`
        conn.query(sql ,email,   
            function (err, results) {
                res.status(200).json(results);
            }
        );

    });

module.exports = router;