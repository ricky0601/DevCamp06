// 맴버변수 == 속성 == 프로퍼티
// 멤버함수 == 메소드

class Employee{
    constructor(
        private _empName : string ,
        private _age : number ,
        private _empJob : string
    ){
        
    }

    // getter setter
    get empName() : string{
        return this._empName;
    }

    set empName(empName : string){
        this._empName = empName;
    }

    

    printEmp = () : void => {
        console.log(this._empName + '의 나이는' + this._age + '이고, 직업은 ' + this._empJob + '입니다.');
    }
}
let employee1 = new Employee('kim' , 20 , 'programmer');
employee1.empName = 'hee';

employee1.printEmp();