export interface Poem {
    id: number;
    title: string;
    content: string;
    author: string;
    tags: string[];
    likes: number;
    comments: Comment[];
  }
  
export interface Comment {
    id: number;
    user: string;
    text: string;
  }
