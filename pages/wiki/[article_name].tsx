import Directory from '@/src/components/directory';
import Loading from '@/src/components/loading';
import { ArticleTypes } from '@/types/articleTypes';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NotFound from '../404';


const Article = () => {
  const [articleData, setArticleData] = useState<ArticleTypes | null>(null);
  const [waiting, setWaiting] = useState(true);
  const router = useRouter();
  const { article_name } = router.query;




  useEffect(() => {
    const fetchArticle = async () => {
      if(!article_name) return null
      try {
        const response = await axios.get(`https://wikitube-new.vercel.app/api/articles/${article_name}/`);
            
        if (response.status === 200) {
          setArticleData(response.data)
          setWaiting(false);
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setWaiting(false);
      }
    
  }

    fetchArticle();
  }, [article_name]);

   if (waiting) return <Loading/>; // Show loading state while waiting for data
  if (!articleData) return <NotFound/>; // Handle case where no data is returned

  return (
    <Directory 
      article_name={articleData.article_name}
      description={articleData.description}
      hyperlinks={articleData.hyperlinks} 
      quizzes={articleData.quizzes} 
      content={articleData.content} 
      waiting={waiting} 
    />
  );
}

export default Article;
