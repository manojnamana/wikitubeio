// articleTypes.ts

export interface Hyperlink {
    hyper_link_word: string;
    hyper_link_word_url: string;
  }
  
  export interface Quiz {
    id: number;
    article: number;
    question: string;
    options: string; // Assuming this is a string of options separated by semicolons
    opt_values: string; // Assuming this is a string of correct values separated by semicolons
    correct_options: string; // The correct option(s)
  }
  
  export interface Content {
    content_id: number;
    content_name: string;
  }

  export interface Videos{
    video_played_id: number;
    video_title:string;
    video_description:string;
    channel_name:string;

  }

  export interface Subtitles{
    transcriptData: { text: string; start: number;duration: number; }[];

  }
  
  export interface ArticleTypes {
    articles: any;
    userperformance: number;
    id: number;
    course_name: number;
    article_name: string;
    slug: string;
    description: string;
    subtitles: Subtitles[];
    article_video_thumbnail: string;
    article_video_url: string;
    hyperlinks: Hyperlink[];
    quizzes: Quiz[];
    content: Content[];
    videos:Videos[];
  }
  