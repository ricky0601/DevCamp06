//  변수의 데이터 타입 명시

let stdId : number = 1111;
let stdName : string = 'lee';
let age : number = 20;
let gender : string = 'male';
let course : string = 'Typescript';
let completed : boolean = false;

enum GenderType{
    Male = 'male',
    Female = 'female',
    GenderNeutral = 'neutral'
}

interface Student{
    stdId : number;
    stdName? : string;
    age? : number;
    gender? : GenderType;
    course? : string;
    completed? : boolean;
    // setName : (name : string) : void;
    setName : (name : string) => void;
    // getName : () => string;
}

let std = {
    stdId :  91011,
    stdName : 'park',
    age : 30,
    gender : GenderType.Male,
    course : 'node.js',
    completed : true,
}

class MyStudent implements Student{
    stdId =  91011;
    stdName = 'park';
    age = 30;
    gender = GenderType.Female;
    course = 'node.js';
    completed = true;

    setName (name : string) : void{
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

function setInfo (student : Student) : void{
    console.log(student);
}

// setInfo(std)

// console.log(getInfo(5678));

// 함수의 데이터 타입 명시 (매개변수)
function plus(a : number, b : number){
    return a+b
}