"use client";
import { useState } from "react";
import { PostData } from "../postdata";

export default function Home() {
  const [postContent, setPostConent] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<String | null>(null);

  const postData: () => PostData = () => ({
    poster: name,
    contents: postContent,
    timestamp: new Date(),
  });

  const submitPost = async () => {
    const response = await fetch("/submit", {
      method: "POST",
      body: JSON.stringify(postData()),
    });

    if (!response.ok) {
      let message = await response.text();
      setError(message);
    } else {
      setError(null);
    }

    setPostConent("");
  };

  return (
    <div className="post-area bg-gray-900 p-5">
      <h1 className="text-xl">Post</h1>
      Name: <input 
        className="text-gray-800"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} 
      />
      <br />
      Content:
      <br />
      <textarea
        className="text-gray-800"
        value={postContent}
        onChange={(e) => setPostConent(e.target.value)}
      />
      <br />
      <button 
        className="bg-gray-600 text-white p-2 m-2"
        onClick={submitPost}
      >
        Post
      </button>

      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
