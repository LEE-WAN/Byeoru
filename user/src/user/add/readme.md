1. client.body 예시
  {
    name: '',
    googleId: num,
    email: 이멜
    //여기서부턴 필수 아님
    image:
    nickname:
    oauth: {

    }
  }

2. response 예시

3. 단일 유저 예시
    {
        userId: num,   //여기서 임의로 부여
        name: 실명,
        nickname: 닉넴,
        image: 사진 url,
        email: 이멜,
        googleId: num,
        facebookId: num,
        oauth: {
            나머지 Oauth 정보는 넣어두기만 함.
        }
    }