import { getComments } from "@/lib/getComments";
import CommentList from "./commentList";

export default async function CommentMD() {
  const data = await getComments();

  return <CommentList comments={data.comments} />;
}
