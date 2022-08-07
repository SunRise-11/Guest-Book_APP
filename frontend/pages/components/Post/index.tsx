import React from "react";
import TimeAgo from "../TimeAgo";

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
};

const Post: React.FC<{ post: PostType }> = ({ post }) => {
  return post.type === "text" ? (
    <div className="py-6 px-6 border rounded-lg space-y-3 bg-white shadow-md">
      <div className="flex justify-between text-sm">
        <p className="text-blue-600">{post.user.username}</p>
        <TimeAgo date={new Date(Date.now() - 10000)} />
      </div>
      <p className="text-lg">{post.data}</p>
    </div>
  ) : (
    <div>
      <p>{post.user.username}</p>
      <p>{post.data}</p>
    </div>
  );
};

export default Post;
