import { PhotographIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { User } from "../Login";
import TextInput from "./TextInput";

const NewPost: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full py-3 px-6 flex items-start space-x-3 ">
      <div className="col-span-1 select-none">
        <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-600">
          <span className="text-lg font-medium leading-none text-white uppercase">
            {user.username.slice(0, 2)}
          </span>
        </span>
      </div>
      <TextInput />
      <div className="col-span-1 h-12 flex items-center">
        <button className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-stone-100 hover:bg-stone-200">
          <span className="text-lg font-medium leading-none text-stone-600 uppercase">
            <PhotographIcon className="w-6 h-6" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default NewPost;
