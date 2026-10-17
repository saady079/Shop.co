import { CommentApi } from "@/src/components/types/comment";

export async function getComments(): Promise<CommentApi> {
  const data = await fetch("https://dummyjson.com/comments");
  return data.json();
}
