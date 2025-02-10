import { PostData } from "../postdata";
import "./post.css";

interface Props {
  post: PostData;
};

export default function Post({ post }: Props) {
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-poster">
          {post.poster}
          {post.flag &&
            <img
              src={
                `https://raw.githubusercontent.com/hampusborgos/country-flags/refs/heads/main/svg/${post.flag}.svg`
              }
              alt={"Flag of " + post.poster}
              className="flag" />
          }
        </div>
        <div className="post-date">{post.timestamp?.toLocaleString()}</div>
      </div>
      <div className="post-contents">{post.contents}</div>
    </div>
  );
}
