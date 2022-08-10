import { useAtom } from "jotai";
import React from "react";

import requestAPI from "../../lib/requestAPI";
import { userAtom } from "../Login";
import { approvedPostsAtom, pendingPostsAtom } from "../../pages";

import Container from "../Container";
import TextPost from "./TextPost";
import ImagePost from "./ImagePost";

export type PostType = {
  id: number;
  type: "text" | "image";
  data: string;
  user: {
    id: number;
    username: string;
    admin: boolean;
  };
  approved: boolean;
  createdAt: number;
  updatedAt: number;
};

const Post: React.FC<{ post: PostType }> = ({ post }) => {
  const [user] = useAtom(userAtom);
  const [approvedPosts, setApprovedPosts] = useAtom(approvedPostsAtom);
  const [pendingPosts, setPendingPosts] = useAtom(pendingPostsAtom);

  const handleApprovePost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await requestAPI.get("/post/approve/" + post.id);
    if (res.status === 200) {
      setApprovedPosts([
        ...approvedPosts,
        {
          ...post,
          approved: true,
        },
      ]);
      setPendingPosts(pendingPosts.filter((p) => p.id !== post.id));
    }
  };

  const handleDenyPost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await requestAPI.delete("/post/", {
      data: post.id,
    });
    if (res.status === 200) {
      setPendingPosts(pendingPosts.filter((p) => p.id !== post.id));
    }
  };

  return (
    <Container className={`${user?.isAdmin ? "px-0 py-0 border-none" : ""}`}>
      <div className={`${user?.isAdmin ? "px-6 py-6 border-x border-t" : ""}`}>
        {post.type === "text" ? (
          <TextPost post={post} />
        ) : (
          <ImagePost post={post} />
        )}
      </div>
      {user?.isAdmin && !post.approved && (
        <div className="font-semibold text-white border-x border-b border-stone-300 rounded-b-lg overflow-hidden">
          <button
            className="w-1/2 bg-red-500 hover:bg-red-600 py-2"
            onClick={(e) => handleDenyPost(e)}
          >
            Deny
          </button>
          <button
            className="w-1/2 bg-green-500 hover:bg-green-600 py-2"
            onClick={(e) => handleApprovePost(e)}
          >
            Approve
          </button>
        </div>
      )}
    </Container>
  );
};

export default Post;
