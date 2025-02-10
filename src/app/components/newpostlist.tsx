"use client";

import { useEffect, useState } from "react";
import { PostData } from "../postdata";
import Post from "./post";

export default function NewPostList() {

  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/newposts");

    eventSource.onmessage = event => {
      try {
        const newPost = JSON.parse(event.data);
        setPosts(prev => [newPost, ...prev]);
      } catch (e) {
        console.log(e);
      }
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="post-list">
      {
        posts.map((post) => (
          <Post post={post} key={post.timestamp.toLocaleString()} />
        ))
      }
    </div>
  );
}
