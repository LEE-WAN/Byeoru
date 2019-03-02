1. client.body 예시
    {
        from: '',
        to: 'post',
        type: 'add',
        content: {
            title
            author
            tags: {
                genre
                about
                hash
            }
            content

            link
            meta: {
                title
                abstract
                thumbnail
            }
        }
    }
2. response 예시
    {
        post_id: num,
        path: '/@iwan/intro-to-bitcoin'
    }
