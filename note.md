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

# 속성과 메소드
## setter / getter
 - 객체 내부에서는 함수
 - 외부에서는 속성으로 사용
 - 클래스로 만들어진 intance 객체에서만 사용 가능

 set bloodType(btype: string)
 {
    this,_bloodType = btype;
 }

 get bloodtype(){
    return this._bloodType;
 }

 p1.bloodType = 'o';
 p1.bloodType;
instance 객체?

## 객체 구성
- 객체를 만드는 방법
- javascript에서 type을 지정할 수 없어서 object 생성시 속성을 줘서 typescript처럼 설정할 수 있다.
    - const myObject = Object.create(null, {
     name : {
        value: "aaa",
        writeable: false,    // 수정 불가
        configureable: false    // 삭제 불가
     }
 })
 myObj.name;

# 일급함수
 - 함수를 변수에 넣을수 있다.
    1) 함수 인자를 함수를 값으로 사용
    2) 반환 값으로 함수를 전달
        - 
        function discountPrice(discountRate){
            return function(price) {
                return price - (price * (discountRate + 0.01));
            }
        }

        discountPrice(30)(56700); // return값이 함수이므로 함수 호출을 위해 ()로 두번 인자를 전달

        let price = discountPrice(30); // 반환값 함수를 변수에 저장
        price(56700);   // 함수 호출 / 표현력 극대화하기 위해 나눠서 사용

# 비동기함수
 - promise는 콜백함수로 비동기 함수를 제공

 async function main() {
    try{
        const result = await delay(3000); // promise를 반환하는 함수에 await를 작성
        console.log('done + result);    // 3초 후에 실행(코드적으론 동기로 실행)
    }
    catch(e)
    {
        console.error('fail async' + e);
    }
}
 
# 생성기함수(generator function)
- 값을 반환하지만 함수가 종료될지 종료되지 않을지 결정할 수 있다
- 생성기 함수는 호출시 함수를 바로 실행하지 않는다
- next() : 함수를 재개하는 메소드, next 함수가 호출되지 않으면 함수는 멈춰있다
- yield : generator를 멈추고 호출 위치에서 리턴
- done : generator 내부에서 return을 만날때 true로 리턴
function* infiniteEnergyGenerator() {
    let energy = 1;
    while (true)
    {
        const booster = yield energy;

        if(booster) {
            energy += booster;
        }
        else
        {
            energy++;
        }
    }
}

const energyGenerator = infiniteEnergyGenerator();
for(let i = 0; i<5; i++)
{
    console.log(energyGenerator.next());
}
console.log(energyGenerator.next(5));

# 객체 - 데이터로써 객체
 - 객체 리터럴 : 코드를 통해 만듦
 - 함수를 통해 객체 생성 -> 객체 리터럴
   : 코드 구성에서 차이가 있다
   : 객체 구성과 데이터를 분리 -> 함수를 통해 객체 생성
     -> 동일한 형태의 객체를 만들때 함수로 반복해서 생성
     -> 구조 변경애 용의
 - 클래스를 이용한 객체 생성
   : 인스턴스 객체 : 어떤 클래스로 만든 객체인지 알 수 있다
     if(boxShap instanceof Shape) // 어떤 클래스로 만든 객체인지 확인 가능

 - optional(?)이 아닌 속성은 삭제(delete)하려면 typescript에서는 오류
 
type Box = {
    width: number;
    height: number;
    color?: string;
}

 - assign : 함수를 복사해서 사용 (참조 X)
    const box1 = box; //(참조)
    const box2 = Object.assign({}, box); // 복사 (참조 X)
    const box4 = {...box, color: 'blue'}; // 복사 (참조 X), 신규 속성 추가
    const box3 = JSON.parse(JSON.stringify(box)); // 복사 (참조 X)


# 배열
## 메소드
 - push : 맨 뒤에 데이터 추가
 - pop : 꺼내온 데이터는 삭제
 - slice : 꺼내올 데이터의 위치 지정 (시작, 끝), 끝의 위치값은 포함되지 안음 slice(1,2) ->arr[1]만 나옴
    - 원래 있는 배열은 유지, 데이터만 추출
 - splice : 꺼내오고, 데이터 추가 (start, end, data...)
    - end 자리까지 포함해서 추출
    - start 위치부터 data 추가
 - shift : 맨 앞 데이터를 빼옴, 빼온 데이터는 삭제
 - unshift : 맨 앞에 데이터 추가
 - join : 배열 내부 문자열을 하나의 문자열로 합침 default 인자는 ','
 - split : 문자열 함수 / 문자열의 구분자로 배열을 만들 : split(',');
 - concat : 배열을 합침 / arr1.concat(arr2);
    const arrSum = [...arr1, ...arr2]; (전개연산자)

## 배열연산
### 순회
```javascript
const books: string[] = {
    "헨리 6세",
    "리처트 3세",
    "실수 연발"
}

 books.forEach((book: string, idx: number, books: string[]) => {
    console.log(idx, book);
 });    // 식을 이용한 배열 순회

const bookObject: Book[] = books.map((book:string) => {
    return {
        title: book,
        author : undefined
    }
});
    // map함수에게 전달된 함수가 리턴한값을 모아서 배열로 만들어서 리턴
    // 배열안의 데이터를 다른 형태로 변경하여 배열로 만듦

const ShakespeareOneBooks: Book[] = books
.map((book:string) => ({
    title: book
}))
.map((book: Book) => ({
    ...book,
    author: 'William Shakespeare' 
}));
    // 메소드 체이닝


const bookTitleToBookObject = (book: string) => ({ title: book});
const makeAuthor = (name:string) => (book: Book) => ({
    ...book,
    author: name
}); // 커링

const ShakespeareOneBooks: Book[] = books
.map(bookTitleToBookObject)
.map(makeAuthor('William Shakespeare'));


```

### 필터링
```javascript

const henry: Book[] = shakespearTwoBooks.filter((book: Book) => 
book.title.includes("헨리")
);  // title에 헨리가 있는 데이터만 추출 (return이 true인 경우만)

```

### 누적함수
``` javascript

const someNumber: number[] = {10, 5, 3, 14, 56};
const sumNumber = someNumber.reduce((a: number, b:number) => a+b, 0);
// a = 0(초기값) / b = 10 
// a = 10 / b = 5 
// a = 15 / b = 3
// a = 18 / b = 14
// a = 32 / b = 56

const someObjects : SomeObject[] = [
    { border: "none"},
    { fontSize : 24},
    { className : "box sm-box"}
];
const someObject: SomeObject = someObjects.reduce((a: SomeObject, b: SomeObject) => ({ ...a, ...b}), {});
// a = {} / b = { border: "none"}
// a = { border: "none"} / b = { fontSize : 24}
// a = { border: "none", fontSize : 24} / b = { className : "box sm-box"}
// a = { border: "none", fontSize : 24, className : "box sm-box"}

```

### 유사배열
 - arguments : 배열과 동일한 형태지만 배열의 메소드는 가지고 있지 않음
 - Array.from(arguments) : 유사 배열을 배열로 변환

 # 튜플
  - 타입스크립트에서만 지원하는 기능
  - 배열과 동일하나 배열의 원소 개수를 제약
  - 배열의 위치값에 type이 지정되어 있어 에러 체크용으로 많이 활용

  ```typescript
  const address: [number, string, string] = [10, 'aa', 'bb'];
  let [zipcode, address] = address; // 구조분해할당
  zipcode ='12345' // error check
  ```

  # 클래스
   - 객체로 만들기 전에 객체 형상화 (설계도)
   - static?
   - 인스턴스 객체 : new로 생성했을 때 실제 객체가 생성됨
   - 재정의 (오버라이드) : 부모가 가지고 있는 속성을 재정의 (readonly도 가능)
   - 생성자 (constructor) : super()를 호출해야 부모의 생성자를 호출
   - 속성을 보호하는 방법 : private / getter만 제공/ readonly
   - abstract : 추상메소드 : 추상클래스에서만 사용 가능
            -> 실체는 자식 class에서 구현
   
   ## 인터페이스
   - class를 설계하기 위한 설계도? 클래스의 설계도를 제한
   - implements
   - public한 속성만 취급

 # 인스턴스
    - 기존 javascript 
      -  prototype : 인스턴스 객체에 나타날 메소드
      - 함수를 new와 사용 : 암묵적으로 객체를 생성
    - class
      - static 인스턴스객체에 나오지 않음
         : new로 생성된 객체에서는 사용하지 못하고 해당 class에서 직접 사용할 수 있다

```javascript
         class CartV1 {
            static createItem = (name, price) => ({name, price});
         }

         let ShoppingCart = new CartV1(); // ShoppingCart는 인스턴스 객체
         ShoppingCart.createItem(); // error
         CartV1.createItem();
```

   # 프로토타입
    - 모든 객체는 `__proto__`라는 객체를 가지고 있다
    - 프로토타입체이닝
    - Object라는 객체가 `__proto__`를 갖고있다

```javascript

    const c1 = {
        color : 'red'
    }

    const c2 = {
        width : 100
    }

    c1.__proto__ = c2;
    c1.width;   // c1에서 width를 호출할 수 있다

    
```
    - 함수의 프로토타입 매커니즘

```javascript
    function Foo(name) {
        this.name = name;
        //this.__proto__ = Foo.prototype;
    }
    
    Foo.prototype.lastName = 'WooWa';
    const foo = new Foo('AAH');

    console.log(foo.lastName); // WooWa

```

# 컨택스트
 - excution 컨택스트 : 실행 컨택스트
    -> 객체의 메소드에 접근
    - 소유자를 함수 실행시 확인

    call / apply : context인자를 전달하여 소유자를 알림 (함수의 메소드)

    - 클래스를 만들때 소유자를 지정해주는 기능
     -> bind;

```javascript

class Person {
    name : string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.getAge = this.getAge.bind(this);
    }

    getAge() {
        return this.age;
    }

    getName = () => this.name;
}

const p1 = new Persion('MyName', 30);
p1.getAge();

const myAge = p1.getAge;
myAge.call(p1);
myAge(); // p1으로 고정됨

p1.getName();
const x = p1.getName;
x();    // lexical context

```

    - lexical 컨택스트 : arrow함수로 선언하면 컨택스트를 고정시킬수 있다

# 클로저
 - 리턴값을 함수로 만들었을때
 - 함수 안에서 함수가 만들어질때, 바깥함수에 접근할때 클로저 공간에 저장하여 변수를 유지하여 사용
 - 클로저 공간은 바깥에서 접근할 수 없다 / 보호되어야하는 값이 필요한경우 사용 -> private
 ```javascript
 function increment() {
    let saveNumber = 1;

    retunr function() {
        return saveNumber++;
    }
 }
    const inc = increment(); // 클로저에 저장
    inc();
    inc();
```

# 제네릭
```typescript
type User = {
    id: number;
    name: string;
}
type Address = {
    zipcode: number;
    address: string;
}

function pipeTwo<T>(value: T): T {  // 확정되지 않은 Type을 사용할꺼야
    return value;
}

let p1 = pipTwo('10');  // p1 : string
let p2 = pipeTwo(true); // p2 : boolean

const pipeObjectOne = <T>(obj: T): T => {
    return obj;
}

let po1 = pipeObjectOne({id : 1, name '홍길', zipcode: 12345});
let po2 = pipeObjectOne<User>({id : 1, name '홍길', zipcode: 12345});   // zipcode에서 에러 출력


class State<S, Config={}> { // type을 여러개 설정
    private _state: S;
    config: Config;
    constructor(state: S, config: Config) {
        this._state = state;
        this.config = config;
    }

    getState() : S {
        return this.state;
    }
}

let s1 = new State<Address, {active:boolean}>({
    zipcode:12345,
    address: '서울시',
}, {
    active: true
});

const s1Data = s1.getState();  // Address

```