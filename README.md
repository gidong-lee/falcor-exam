#Netflix Falcor Route 및 Client Sample
Falcor는 효율적인 데이터 가져 오기를위한 JavaScript 라이브러리다

Netflix falcor는 GraphQL + realy개발 스택과 많이 비교된다.
JSON Graph를 사용 JSON에 레퍼런스 개념을 추가하여 중복데이타로 인해 발생하는 문제를 방지하고
Overfetch를 방지한다.
(예 : Redux)
```javascript
{
    productList: [
       {
         id: 100,
         name: "생수",
         sellerId: 10000,
         seller: $ref("sellerById[10000]")
       },
       {
         id: 200,
         name: "맥스 커피",
         sellerId: 10000,
         seller: $ref("sellerById[10000]")
       }
     ],
     sellerById: {
       "10000": {
         id: 10000,
         name: "물장수",
         like: false
       }
     }
 }
```


#### 예제에서 Falcor DataSource 구현 방법
- 하나의 JSON Graph객체를 asDataSource를 통해 구현
- Router를 이용하여 한땀한땀 DataSource 구현


###샘플설명
해당 샘플은 아래 여러종류로 구성이 되어 있다.
따라서 호출에 따라서 여러가지로 처리되는 것을 확인해 볼수 있다.


*# json-server : json파일을 읽어서 rest api 서버처럼 특정포트로 서비스 해주는 라이브러리다*

- FE -> Falcor Server(express) -> REST API 서버.

데이타 캐싱이 일어나는 곳 :  FE, 브라우저

데이타 Composite 위치 : Falcor Server

End Point 제공 : Falcor Server (model.json)




- FE -> express -> Falcor Server(express) -> REST API 서버.

데이타 캐싱이 일어나는 곳 :  express 서버내 falcor.Model

데이타 Composite 위치 : Falcor Server 또는 express에서도 가능. 

End Point 제공 : express(productList.json 등)




##샘플 설치 방법
```
# node는 알아서 설치해주세요. https://nodejs.org/
# async await때문에 7버전이상 필요.

#node package 설치.
> npm install

# nodemon 설치 node application 수정시 자동 재구동.(Global  설치.)
> npm install -g nodemon

```


##샘플 실행 방법
```
# express 서버 (port : 8000)
> nodemon composite.js 

# falcor server(port : 9000)
> nodemon index.js

# rest api server(port : 10000)
npm run json:server
```


## 브라우저에서 확인 방법
아래 두가지 URL에 접속하여 데이타를 호출해보고 Request와 Response에 대해서 체크해보자.

- FE -> Express server(Falcor Client) -> Falcor Server(express) -> REST API 서버

http://localhost:8000/


- FE(Falcor Client)) -> Falcor Server(express) -> REST API 서버.

http://localhost:9000/

http://localhost:9000/index2.html