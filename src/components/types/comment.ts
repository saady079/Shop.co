export interface userComment {
  id: number;
  body: string;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface CommentApi {
  comments: userComment[];
  total: number;
  skip: number;
  limit: number;
}
