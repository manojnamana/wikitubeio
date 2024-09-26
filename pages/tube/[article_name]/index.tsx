import Player from './../../../src/components/player';
import { useRouter } from 'next/router'
import React from 'react'



const ArticlePlayer = () => {
    const router = useRouter();
    console.log(router)
    const { article_name } = router.query;
  return (
    <Player/>
  )
}

export default ArticlePlayer
