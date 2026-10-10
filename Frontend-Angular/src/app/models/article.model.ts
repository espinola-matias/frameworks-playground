export interface Article {
  _id?: string;
  title: string;
  content: string;
  date?: string | Date;
  image?: string | null;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  articles?: T[];
  article?: T;
  image?: string;
}
