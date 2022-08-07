import { useAtom } from "jotai";
import type { NextPage } from "next";
import useSWR from "swr";
import { ExclamationIcon } from "@heroicons/react/outline";
import Container from "./components/Container";
import { userAtom } from "./components/Login";
import NewPost from "./components/NewPost";
import Post, { PostType } from "./components/Post";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
};

const UnableToFetchPosts: React.FC = () => (
  <Container className="flex items-center justify-center flex-wrap flex-col select-none">
    <ExclamationIcon className="w-16 h-16 text-red-400" />
    <p className="text-xl text-stone-600 font-semibold">
      Error: Unable to fetch posts
    </p>
  </Container>
);

const Home: NextPage = () => {
  const [user] = useAtom(userAtom);
  const { data: posts, error } = useSWR<PostType[]>(
    "http://localhost:8080/api/post",
    fetcher
  );

  if (error) return <UnableToFetchPosts />;
  if (!posts) return null;

  return (
    <div className="space-y-6">
      {user && <NewPost user={user} />}

      {posts &&
        posts.length > 0 &&
        posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
    </div>
  );
};

export default Home;
