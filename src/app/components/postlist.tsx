// SSR Post list

import { getPosts } from "../db";
import { PostData } from "../postdata";
import Post from "./post";

export default async function PostList() {
  const posts: PostData[] = await getPosts();

  return (
    <div className="post-list">
      {
        posts.map((post) => (
          <Post post={post} key={post.timestamp.toLocaleString()} />
        ))
      }
    </div>
  )
}
