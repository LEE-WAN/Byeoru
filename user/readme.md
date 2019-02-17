1. 단일 user 구조
    {
        userId: num,   //여기서 임의로 부여
        name: 실명,
        nickname: 닉넴,
        image: 사진 url,        
        googleId: num,
        facebookId: num,
        oauth: {
            나머지 Oauth 정보는 넣어두기만 함.
        }
    }

2. API 기능
    get
        1. userId를 받으면 그에 해당하는 정보를 Return한다.
        2. 필요시 추가
    add
        1. user를 추가한당
    remove
        1. user를 제거한당
    edit
        1. user정보를 수정한당.
    notify
        1. 해당 유저에게 알림정보를 추가한당.
3. Messaging 양식
    {
        from: string,
        to: string,
        type: string,
        content: {

        }
    }

4. 주소 방식
https://author.ga/@iwan?page=overview