import Image from "next/image";
import Form from "./components/form";
import PostList from "./components/postlist";
import NewPostList from "./components/newpostlist";


export default function Home() {

  return (
    <>
      <Form />
      <NewPostList />
      <PostList />
    </>
  );
}
