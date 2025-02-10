import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { PostData } from './postdata';

const connect = async () => {
  const db = await open({
    filename: './posts.db',
    driver: sqlite3.Database
  })
  await db.exec(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      poster TEXT,
      contents TEXT,
      timestamp TEXT
    )`);

  return db;
}

export const appendPost = async (post: PostData) => {
  const db = await connect();
  await db.run(
    `INSERT INTO posts (poster, contents, timestamp) VALUES (?, ?, ?)`,
    post.poster, post.contents,
    JSON.stringify(post.timestamp)
  );
};

export const getPosts = async () => {
  const db = await connect();

  const posts: PostData[] = (await db.all(`SELECT * FROM posts`))
    .map((post) => ({
      poster: post.poster,
      contents: post.contents,
      timestamp: JSON.parse(post.timestamp)
    }));

  posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return posts;
};
