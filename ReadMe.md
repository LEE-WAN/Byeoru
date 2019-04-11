# 서론

 "벼루"플랫폼은 일종의 블로깅 플랫폼으로 기존 블로깅 플랫폼들이 개인의 공간에 글을 올려 개인단위로 운영되는 컨텐츠들을 보여주는것에 초점을 맞춘 반면, 본 플랫폼에서는 개인적인 공간을 없애고 태그를 이용하여 글들의 주제를 중심으로 분류, 컨텐츠 소비자들로 하여끔 자신의 취향인 글들을 찾기 쉽게 하는것에 초점을 맞춘다.



 이 문서는 이 플랫폼을 만드는 과정의 개발일기이다.



# 기본 구조

 본 프로젝트는 Kubernetes 기반으로 운영될것을 고려한 Microservice Architecture 구조를 채택하고 있으며 각 Microservice는 Stateless 한 상태를 가질것을 전재로 개발되고있다. Frontend는 Nuxt.js를 사용한 Vue SPA 구조를 가지며 Backend는 일단 Node.js 로 통일한다.

 벼루는 크게 3부분으로 나뉜다.

```mermaid
graph LR
	subgraph Client
		A["View (Vue)"]
	end
	subgraph Server
		A1["View (Nuxt.js)"]
		B[API Gateway]
		C[Microservices]
	end
	A --- A1
	A1 --> B
	A --> B
    B --- C
```

 View는 Nuxt.js를 이용한 Vue.js SPA 이며 Server Side Rendering 을 지원한다.

 View에서의 모든 요청은 외부로 공개된 API Gateway에서 행해지며

 API Gateway에서 받은 요청은 외부로 공개되지 않은 Microservices 들에 의해 실질적인 작업이 이루어지게 된다. (2019-04-19)



# 세부구조

## View

(개발중)

## API Gateway

### 인증

 각 사용자가 본인이 맞는지 증명을 Stateless 하게 행하기 위해 본 프로젝트에서는 JWT 방식을 사용한다. 최초 로그인 후 사용자의 ID와 userId를 JWT 방식으로 사용자의 Cookie에 저장. 후에 권한이 필요한 요청이 발생할 경우 API Gateway에서 토큰이 Valid 한지 체크한 후 유효하면 Microservice에 요청을 계속하고, 그렇지 아니하면 `401` 오류를 발생시킨다.

 API Gateway는 해당 정보가 유효한지만 체크하고 해당 권한이 올바른 권한인가? 에 대한 판다는 각 Microservice에서 행한다. (2019-04-19)

## Microservices

### 공통 구조

#### 메시지 규격

Microservice 간에 발생하는 메세지들은 모두 다음과 같은 통일된 JSON 문서를 POST 방식으로 요청하는것으로 행해진다.

```json
{
    from: "post",	// 요청이 누구로 부터 왔는지를 명시
    to: "user",		// 누구한테 보내는 요청인지를 명시
    type: "get",	// 어떤종류의 행동을 요구하는지 명시
    content: {		// 해당 행동을 위해 필요한 추가정보를 명시
        userId: "1f12f0a"	// 이부분은 각 요청마다 달라지는 부분
    }
    auth: {			// API Gateway에서 인증및 보장
    	userId: userId		// 행위의 주체자 명시
	}
    /*
    	post 가 user에게 get 요청을 보냄, 부수적인 정보로 userId가 1f12f0a 임을 알림
    */
}
```

해당 요청이 정상적으로 처리될경우 각 Microservice에서 명시된 JSON 형식의 메세지가 반환될 것이고, 요청 처리에 실패할 경우 그에 맞는 Http Code 와 함께 다음과 같이 구체적인 실패 사유가 반환됨.

```JSON
{	// 404
    message: "User not found"
}
```

#### 공용 라이브러리

```
./lib
	└ ./logics	LogicFlow 규격에 맞는 함수들 모음
		└ bodychk.js	메세지가 올바른 JSON인지 확인
		└ errHandler.js	오류가 발생했을때 오류 내용을 요청자에게 알리고 로그로 남김
		└ msgchk.js		올바른 벼루 Microservice 메시지 규격을 가지는지 확인
		└ sendRes.js	요청결과를 요청자에게 보내줌
		└ timechk.js	작업이 행해진 시간을 측정한
	└ database.js	DB 접속및 요청 관련 라이브러리들
	└ logger.js		로깅관련 라이브러리들
	└ message.js	벼루 Microservice 메시지 규격으로 메시지 보냄
```



#### Logic Flow

https://github.com/LEE-WAN/LogicFlow

#### 공통구조

##### lib

공용 라이브러리가 들어있는 폴더

##### type

각 서비스에서 제공하는 행동(기능)이 파일 혹은 폴더단위로 들어가 있다.

##### index.js

시작 스크립트, Node.js의 기본 http 모듈로 서버 서비스를 시작하고 매 새로운 클라이언트의 접속마다 클라이언트 전용으로 초기화 과정에서 정의된 `const logic`을 복제한 새로운 `const clientLogic`을 정의하고 `clientLogic.start(store);` 와 함께 실질적인 요청에 대한 행동을 시작하게 된다.

##### route.js

받은 요청이 Valid 한 Type인지 검증절차를 거친 후, 메세지에 명시된 type에 해당하는 Function을 호출해주는 역할을 한다. 

 ### post

 각 문서(POST)를 관리하는 서비스이다.

#### Post Documet Schema

```JSON
{
    title: String,
    link: String,	// /@${ name }/${ link }
    author: userId,
    postId: postId,
    date: {
        lastModification: Date,
        created: Date
    }
    category: String,
    tags: String Array,
    content: String,
    meta: {
    	title: String,
    	abstracrt: string,
    	thumbnail: url,
	}
}
```

#### add

##### request

필수항목

```json
auth: {
    userId: userId
},
content: {
    title: String,
    category: String,
    tags: String Array,
    content: String
}
```

선택항목

```json
content: {
    link: String				//title
    meta: {
    	title: String,			// title
    	abstract: String,		// content 앞쪽 200글자
    	thumbnail: String(url)	// default
	}
}
```

##### response

성공할 경우:

```json
{
    postId: post.postId,
    link: `/@${auth.name}/${content.link}`,
}
```

인증 실패: 401, Unauthorized access

잘못된 요청: 400, Invalid post add format

중복된 요청: 400, Duplicated title or Duplicated link

#### get

##### request

       1. postId: postId
       2. link: /@이완해/project-byeoru

##### response

찾을경우: Documet Schema 그대로 반환

못찾을경우: 404, Post not found

#### edit

(개발중)

#### remove

(개발중)

### comment

(개발중)

### search

(개발중)

### user

 각 유저 정보를 관리하는 서비스

#### User Document Schema

```json
{
    name: String,
    googleId: googleId,
    email: String,
    image: String(url),
    nickname: String,
    oauth: {},
    userId: Number,
    date: Date
}
```

#### add

##### request

필수항목

```json
content: {
    name: String,
    email: String,
    googleId: String,	//or facebookId, naverId.... etc
}
```

선택항목

```json
content: {
    nickname: String,
    image: String(url),
    
}
```

##### response

성공할 경우: User Documet Schema 반환

양식이 안맞을 경우: 400, Invalid user add format

중복될 경우: 400, Duplicated user infomation

#### get

##### request

```
1. userId: userId
2. googleId: googleId
3. name: String
4. nickname: String
```

##### response

성공할 경우: User Document Schema 반환

양식이 안맞을 경우: 400, Invalid user request format

못찰을 경우: 404, User not found

### oauth-google

 구글과 연계하여 사용자 정보(userId)를 받아오는 서비스

#### redirect

##### response

```json
{
    url: "https://apis.google.com/redirect-url"
}
```

로그인 진행을 위해 클라이언트가 접속해야할 페이지 url return

#### auth

##### request

```json
content: {
    code: String
}

```

google에서 제공한 Access Token

##### response

```
{
    googleId: googleId
}
```

양식이 안맞을 경우: 400, Invalid request

유효한 코드가 아닐경우: 400, Invalid Code

### storage

# Procedure

## 로그인 절차

```mermaid
sequenceDiagram
	Client->>API Gateway:Request login via Google
	API Gateway->>Oauth Google:Request redirect url
	Oauth Google->>API Gateway:Response
	API Gateway->>Client:Response
	Client->>Google:Login request
	Google->>Client:Access Token
	Client->>API Gateway:Access Token
	API Gateway->>Oauth Google:Access Token
	Oauth Google->>API Gateway:googleId
	API Gateway->>User:googleId
	User->>API Gateway:User Document
	API Gateway->>Client:JWT
```

## 회원가입 절차

```mermaid
sequenceDiagram
	Client->>API Gateway:Request login via Google
	API Gateway->>Oauth Google:Request redirect url
	Oauth Google->>API Gateway:Response
	API Gateway->>Client:Response
	Client->>Google:Login request
	Google->>Client:Access Token
	Client->>API Gateway:Access Token
	API Gateway->>Oauth Google:Access Token
	Oauth Google->>API Gateway:googleId
	API Gateway->>User:googleId
	User->>API Gateway:404 User not found
	API Gateway->>Client:Google Openid info to Webstorage
	API Gateway->>Client:Redirect to register page
	Client->>API Gateway:Register info
	API Gateway->>User:add User
	User->>API Gateway:User Document
    API Gateway->>Client:JWT
```



# 변수정리
