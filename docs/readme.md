1. 마이크로서비스 종류에 관하여    
    - Renderer  Server-side Renderer
    - Post      글 저장 및 관리    
    - Comment   댓글 저장 및 관리
    - User      사용자 정보 관리
    - Auth      Session 기반 사용자 인증
    - Drive     S3 기반 (주로)이미지 저장 관리
    - Search    Elastic Search 기반 문서 검색   https://www.elastic.co/kr/blog/nori-the-official-elasticsearch-plugin-for-korean-language-analysis

2. 기본적인 구상

Client <-> (Load Balancer) <-> Renderer <-> Post, Comment, Auth, Drive, User, Search

3. 메세지 양식
    3-1. 요청
        {
            from: '',
            to: '',
            type: '',
            content: {

            },
        }
    3-2. 성공
        http.statusCode = 200;
        {
            필요한 정보 양식별로 지정               
        }
    3-3. 실패
        https.statusCode != 200;
        {
            message: ''
        }
