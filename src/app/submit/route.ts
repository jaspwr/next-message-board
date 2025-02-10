import { appendPost } from "../db";
import { broadcast } from "../newposts/route";
import { PostData } from "../postdata";

export async function POST(request: Request) {
  const post = await request.json() as PostData;
  
  const error = (message: string) => new Response(message, {
    status: 400,
    headers: {
      "Content-Type": "text/plain",
    },
  });

  if (!post.poster?.length) {
    return error("No name provided");
  };

  if (!post.contents?.length) {
    return error("No content provided");
  };

  appendPost(post);

  broadcast(post);

  return new Response("Post submitted!", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
