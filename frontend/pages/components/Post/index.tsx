import React from "react";

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
    <div className="py-3 px-6 border space-y-3">
      <div className="flex justify-between">
        <p className="text-blue-600">{post.user.username}</p>
        <p>{Date.now().toString()}</p>
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
