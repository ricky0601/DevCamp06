const express = require('express');
const app = express();

app.listen(1234);

let fruits = [
    { id : 1 , name : "apple"},
    { id : 2 , name : "grape"},
    { id : 3 , name : "watermelon"},
    { id : 4 , name : "lemon"}
]

// 과일 전체 조회
app.get('/fruits' , (req, res) => {
    if(fruits){
        res.json(fruits);
    }else{
        res.json({
            message : "과일이 없습니다."
        })
    }
})

// 과일 개별 조회
app.get('/fruits/:id' , (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    let findFruit = 
        fruits.find(f => f.id == id);
        // fruits 배열 안에 있는 객체 중, id 값이 params.id랑 같은 객체

    // fruits.forEach((fruit) => {
    //     if (fruit.id == id) {
    //         findFruit = fruit;
    //     }
    // });

    if(findFruit){
        res.json(findFruit);
    }else{
        res.status(404).send("전달한 id로 저장된 과일이 없습니다.")
    }
})