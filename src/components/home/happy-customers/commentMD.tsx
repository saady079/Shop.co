import { getComments } from "@/lib/getComments";
import CommentList from "./commentList";
import Container from "../../constant/container";

export default async function CommentMD() {
  const data = await getComments();

  return (
    <Container>
      <CommentList comments={data.comments} />
    </Container>
  );
}
