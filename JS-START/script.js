/*
1. 자바스크립트 함수는 함수의 실제 매개변수가 될 수 있다.
2. 자바스크립트 함수는 함수의 반환값이 될 수 있다.
3. 자바스크립트 함수는 할당명령문의 대상이 될 수 있다.
4. 자바스크립트 함수는 동일비교의 대상이 될 수 있다.
*/

const foo = function (arg) {
    return arg;
};

console.log(foo(1));

const bar = () => console.log("Hello");
const baz = bar;
console.log(bar === baz); // true

/*
1. 기본값 매개변수 default function parameter
2. 나머지 매개변수 Rest parameter
3. arguments 객체
*/

function exampleFunc(arg = 10, ...rest) {
    console.log("arg:", arg);
    console.log("rest:", rest);
    console.log("arguments:", arguments);
}

exampleFunc(1, 2, 3, 4);

/*
1. 함수 선언문
2. 함수 표현식
3. Function 생성자 함수
4. 화살표 함수 표현식
*/

function funcDeclaration() {
    console.log("함수 선언문");
}

const funcExpression = function () {
    console.log("함수 표현식");
};

const funcConstructor = new Function("console.log('Function 생성자 함수')");

const arrowFunc = () => {
    console.log("화살표 함수");
};

funcDeclaration();
funcExpression();
funcConstructor();
arrowFunc();

/*
1. IIFE (즉시 실행 함수)
2. 재귀함수
3. 중첩함수
4. 콜백함수
*/

(function () {
    console.log("즉시 실행 함수");
})();

function recursiveFunc(num) {
    if (num === 3) return;
    console.log(num);
    recursiveFunc(num + 1);
}
recursiveFunc(1);

function outerFunc(arg) {
    function innerFunc() {
        console.log(arg);
    }
    innerFunc();
}
outerFunc(1);

function callbackExample(callback) {
    callback();
}

callbackExample(() => {
    console.log("콜백 함수 실행");
});
