import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { atom, useAtom } from "jotai";

import { userAtom } from "./components/Login";
import requestAPI from "./lib/requestAPI";

import { ExclamationIcon } from "@heroicons/react/outline";
import Container from "./components/Container";
import Post, { PostType } from "./components/Post";
import NewPost from "./components/NewPost";
import EditPostModal from "./components/Post/EditPostModal";

const UnableToFetchPosts: React.FC = () => (
  <Container className="flex items-center justify-center flex-wrap flex-col select-none">
    <ExclamationIcon className="w-16 h-16 text-red-400" />
    <p className="text-xl text-stone-600 font-semibold">
      Error: Unable to fetch posts
    </p>
  </Container>
);

export const approvedPostsAtom = atom<PostType[]>([]);
export const pendingPostsAtom = atom<PostType[]>([]);

const Home: NextPage = () => {
  const [user] = useAtom(userAtom);
  const [approvedPosts, setApprovedPosts] = useAtom(approvedPostsAtom);
  const [pendingPosts, setPendingPosts] = useAtom(pendingPostsAtom);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestAPI
      .get("/post")
      .then((res) => {
        if (res.status === 200) {
          const data: PostType[] = res.data;
          const approved = [],
            pending = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].approved) {
              approved.push(data[i]);
            } else {
              pending.push(data[i]);
            }
          }
          setApprovedPosts(approved);
          setPendingPosts(pending);
        } else {
          throw new Error("unable to load posts");
        }
      })
      .catch((e) => {
        setError(e);
      });
  }, [setApprovedPosts, setPendingPosts, user]);

  if (error) return <UnableToFetchPosts />;
  if (!approvedPosts) return null;

  return (
    <div className="space-y-6">
      {user && <NewPost user={user} />}

      <EditPostModal />

      {pendingPosts.length > 0 &&
        pendingPosts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}

      {approvedPosts.length > 0 &&
        approvedPosts
          .sort((a, b) => (a.createdAt > b.createdAt ? 0 : 1))
          .map((post) => {
            return <Post key={post.id} post={post} />;
          })}
    </div>
  );
};

export default Home;
