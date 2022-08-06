import React, { useState } from "react";
import { getCookie } from "cookies-next";

const PostForm: React.FC = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleCreatePost = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("access_token"),
      },
      body: JSON.stringify({
        type: "text",
        data,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          throw new Error("you need to be logged in");
        }
        return res.json();
      })
      .catch((error) => {
        setError(error.message);

        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <div className="py-3 px-6 border space-y-3 flex flex-wrap justify-end ">
      <textarea
        className="block py-3 text-lg focus:outline-none w-full max-h-32 resize-y border-b"
        placeholder="Create new post..."
        maxLength={160}
        rows={3}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <div className="flex items-center space-x-4">
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          onClick={(e: React.MouseEvent<HTMLElement>) => handleCreatePost(e)}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostForm;
