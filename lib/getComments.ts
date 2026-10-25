import { CommentApi } from "@/src/components/types/comment";
import { BASE_URL } from "./variables";

export async function getComments(): Promise<CommentApi> {
  const data = await fetch(`${BASE_URL}/comments`);
  return data.json();
}
