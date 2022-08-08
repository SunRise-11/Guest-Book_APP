import React, { useState } from "react";
import { User } from "../Login";
import NewPostModal from "./NewPostModal";

const NewPost: React.FC<{ user: User }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md w-full py-3 px-6 flex items-start space-x-3 ">
      <div className="col-span-1 select-none">
        <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-600">
          <span className="text-lg font-medium leading-none text-white uppercase">
            {user.username.slice(0, 2)}
          </span>
        </span>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="w-full h-12 flex items-center justify-center rounded-md bg-stone-100 hover:bg-stone-200 text-lg text-stone-700 font-semibold select-none cursor-pointer"
      >
        Create Post
      </button>
      <NewPostModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default NewPost;
