1. 단일 post 구조
    {
        title: string,
        author: user_id,
        postID: post_id,
        date: {
            lastModified: date
            created: date            
        },
        tags: [],
        content: string,
        meta: {
            title: string,
            abstract: string,
            thumbnail: string(url)
        }
    }

2. API 기능
    get
        content: {
            postID: int
        }
    add
        content: {
            title: string,
            author: user_id,
            tags: [],
            content: string,
            meta: {
                없으면 자동으로,
                있으면 그거 그냥 추가.
            }
        }
        return: {
            postID: int
            url:
        }
    edit
    remove
    tmpAdd
    tmpEdit
    tmpRemove

3. Messaging 양식
    {
        from: string,
        to: string,
        type: string,
        content: {

        }
    }

4. 주소 방식
https://author.ga/post/1
https://author.ga/api/post/1
https://author.ga/@iwan/intro-to-bitcoin