import type { NextPage } from "next";
import useSWR from "swr";
import Post, { PostType } from "./components/Post";
import PostForm from "./components/PostForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { data: posts, error } = useSWR<PostType[]>(
    "http://localhost:8080/api/post",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!posts) return <div>loading...</div>;

  return (
    <div className="space-y-6">
      <PostForm />

      {posts !== undefined &&
        posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
    </div>
  );
};

export default Home;
