#
 - 실행방법 
parcel index.html

#
html의 구조를 알수 없으니 dom api를 사용하지 않고 innerHTML을 사용해서 코딩
dom api를 없애는게 맞나?

# Generic : <T>
함수에서 여러 type으로 return을 할 때 호출하는 함수에서 type을 설정하여 함수를 호출할 수 있도록 해주는 기능

# Mixins(믹스인)
extends 
-> 코드에 적시되어야 사용할 수 있는 방법 : 코드를 직접 바꿔야 사용 가능
-> 다중상속을 지원하지 않음


# 기본 타입은 값 복사
object는 참조
객체는 복사할 수 없나?

for of > 값을 리턴
for in > key를 리턴

# type / interface
## 타입 별칭(type)
 - 특정 type에 이름을 붙여준다
type [타입이름] = [타입];
type Age = number;
 -> compile시 타입을 검사하는데만 사용

[상속]
type [별칭1] = [별칭(type|interface)] & {

}

type [별칭2] = [별칭(type|interface)] & [별칭1(type|interface)] &{

}

## interfaace
 - 객체 type을 정의
 - 코드를 읽기 좋음
 - | (union type)사용 불가
- readonly : 내부 변수 앞에 선언시 변경불가 (const?)

interface [별칭] {
    readonly id: number;
    email : string;
    address? : string;
}
[상속]
interface [별칭1] extends [별칭(type|interface)] {

}

interface [별칭2] extends [별칭(type|interface)], [별칭1(type|interface)] {

}

##type / interface는 문법적으로 차이가 없음
##interface는 중복된 이름으로 선언시 add
##type은 중복된 이름으로 선언시 에러출력

### 해당 interface를 설정한 경우, 변수의 type만 미리 설정할 수 있다
  interface(type) [별칭] {
    [key: string] : number;
  }
    
### 함수도 미리 설정할 수 있다
  (인자):리턴
   interface(type) IGetApi {
    (url: string, search?:string): Promise<string>;
   }

   type [별칭] = (url: string, search?:string) => Promise<string>;

##interface에 선언된 속성은 private로 선언 불가 무조건 public


# 함수
function [함수이름]() {

}   // 함수정의문

## 이름없는 함수(익명함수)
function () {
    return 100;
}
 -> 함수를 호출할 수 없다

함수를 값으로 취급하여 사용 : 익명함수는 변수에 넣어야 사용할 수 있다

const myFnV2 = function() {         // 함수 정의 식
    return 100;
};
myFnV2(); // 이름 없는 함수를 호출 할 수 있다

## 즉시 실행 함수
어플리케이션 내에서 단 한번만 실행할 수 있는 함수
(function() {
    console.log('즉시 실행');
})();

## 함수 호출 방법
myFnV2.call();
myFnV2.apply();

## 가변인자
javascript에선 함수 인자의 개수가 맞지 않더라도 호출할 수 있음

function sum(/*a,b,c*/){
    let s = 0;
    for(let i = 0; i < arguments.length; i++){
        s += arguments[i];
    }
    return s;

    return a+b+b;
}   // 호출시 전달받은 인자는 arguments에 들어가서 저장된다
    // 인자를 기술할 필요가 없다
    // 함수가 가변인자를 처리하는지 이름으로 알 수 없다
const abcSum = sum(10,20,30,40);
const abcSum2 = sum(10,20);

function sum(a, b, ...args){  // 인자가 몇개가 올지 모른다
    console.log(args);          // a,b는 필수값 추가로 인자 추가가 된다
    let s = 0;
    for(let i = 0; i < args.length; i++){
        s += args[i];
    }
    return s;
}

const arr = [10,20,30,40];
sum(10, 20, 30);
sum.call(null, 10, 20, 30); // 인자로 전달
sum.apply(null, arr); // 배열로 전달

##변형함수

###화살표함수
 - 이름이 없는 익명함수
 - 변수에 넣어야함
const sumV2 = (a,b, ...args) => {
    let s = 0;
    for(let i = 0; i < args.length; i++){
        s += args[i];
    }
    return s;
}

 - 한줄함수
 - 코드의 결과를 바로 리턴 ({} 생략)
 const ten = (x) => 100+x;
 const ten2 = x => 100+x;   // 인자가 하나면 괄호 생략 가능

 ten(10); // 110;

 ### 생성기함수(generator function)
  - 함수를 바로 실행하지 않고 실행 준비 상태로 대기
  - yield 위치에서 멈췄다가 다시 실행
  - next 수행시 객체를 리턴
 function* gen() {
    yield 10;
    yield 20;
    return 30;
 }

 const g = gen();
g.next(); // {value: 10, done: false}
g.next(); // {value: 20, done: false}
g.next(); // {value: 30, done: false}


### 비동기 함수(async function )
async function myTask() {

}