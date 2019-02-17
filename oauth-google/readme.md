1. 역할
    1- 유저가 Renderer에 접속한다.
    2- Renderer에서 여기로 Redirect URL을 요청한다.
    3- 답변을 준다.
    4- 클라이언트에서 로그인 후에 요청 결과를 다시 여기로 준다.
    5- 없는 정보면 새로 회원가입 시키고
    6- USER에서 사용하는 user_id를 return 해줌.

2. API
    redirect
        response: {
            url: '',
        }
    auth
        content: {
            get: '', // '/'이하 전부 받음
        }
        response: {
            user_id: num
        }

3. TODO
    토큰으로 정보가져오는 부분 (oAuth.js) 예외처리 필요