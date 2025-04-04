"use strict";
//  변수의 데이터 타입 명시
let stdId = 1111;
let stdName = 'lee';
let age = 20;
let gender = 'male';
let course = 'Typescript';
let completed = false;
var GenderType;
(function (GenderType) {
    GenderType["Male"] = "male";
    GenderType["Female"] = "female";
    GenderType["GenderNeutral"] = "neutral";
})(GenderType || (GenderType = {}));
let std = {
    stdId: 91011,
    stdName: 'park',
    age: 30,
    gender: GenderType.Male,
    course: 'node.js',
    completed: true,
};
class MyStudent {
    constructor() {
        this.stdId = 91011;
        this.stdName = 'park';
        this.age = 30;
        this.gender = GenderType.Female;
        this.course = 'node.js';
        this.completed = true;
    }
    setName(name) {
        this.stdName = name;
        console.log(`이름 설정 : ${this.stdName}`);
    }
}
const MyInstance = new MyStudent();
MyInstance.setName("1dg");
// function getInfo (id : number) : Student{
//     return {
//         stdId :  id,
//         stdName : 'lee',
//         age : 20,
//         gender : 'female',
//         course : 'Typescript',
//         completed : true,
//     }
// }
function setInfo(student) {
    console.log(student);
}
// setInfo(std)
// console.log(getInfo(5678));
// 함수의 데이터 타입 명시 (매개변수)
function plus(a, b) {
    return a + b;
}
