import { Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import requestAPI from "../../lib/request";

const TextInput: React.FC = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleCreatePost = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    requestAPI({
      url: "http://localhost:8080/api/post",
      options: {
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
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {});
  };

  return (
    <div className="post_input">
      <Transition
        show={!isShowing}
        enter="transition ease duration-500 transform"
        enterFrom="opacity-0 -translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease duration-500 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-full"
        className="w-full"
      >
        <div
          className="create_btn"
          onClick={() => setIsShowing((isShowing) => !isShowing)}
        >
          <p className="text-lg text-stone-700 font-sans">Create a post</p>
        </div>
      </Transition>
      <Transition
        show={isShowing}
        enter="transition-all ease duration-700 transform"
        enterFrom="opacity-0 h-12"
        enterTo="opacity-100 h-48"
        leave="transition-all ease duration-1000 transform"
        leaveFrom="opacity-100 h-48"
        leaveTo="opacity-0 h-12"
        className="w-full overflow-hidden flex flex-wrap justify-end space-y-2"
      >
        <textarea placeholder="Write something here..."></textarea>
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          onClick={(e: React.MouseEvent<HTMLElement>) => handleCreatePost(e)}
        >
          Post
        </button>
      </Transition>
    </div>
  );
};

export default TextInput;
