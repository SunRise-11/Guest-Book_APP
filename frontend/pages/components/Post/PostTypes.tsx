/* eslint-disable @next/next/no-img-element */
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useAtom } from "jotai";

import { userAtom } from "../Login";

import TimeAgo from "../TimeAgo";
import { EditPostModalOpen } from "../EditPostModal";

import { PostType } from ".";

const UserTitle: React.FC<{ post: PostType }> = ({ post }) => {
  const [currentUser] = useAtom(userAtom);
  const [modal, setModal] = useAtom(EditPostModalOpen);
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex space-x-3 w-full">
        <div className="col-span-1 select-none">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-500">
            <span className="text-lg font-medium leading-none text-white uppercase">
              {post.user.username.slice(0, 2)}
            </span>
          </span>
        </div>
        <div>
          <p className="text-stone-600 font-semibold capitalize">
            {post.user.username}
          </p>
          <p className="text-sm">
            <TimeAgo date={new Date(post.createdAt)} />
          </p>
        </div>
      </div>

      {currentUser?.isAdmin && (
        <div>
          <button
            onClick={() => {
              console.log("object");
              setModal({ post: post, open: true });
            }}
            className="p-2 rounded-full transition-colors  hover:bg-stone-200 text-stone-600 "
          >
            <DotsVerticalIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

const TextPost: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <>
      <div className={`flex justify-between items-start`}>
        <UserTitle post={post} />
      </div>
      <p className="pt-4">{post.data}</p>
    </>
  );
};

const ImagePost: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <>
      <div className={`flex justify-between items-start`}>
        <UserTitle post={post} />
      </div>
      <p className="pt-4">
        <img
          src={`http://localhost:8080/api/image/get/${post.data}`}
          className="rounded-lg"
          alt=""
        />
      </p>
    </>
  );
};

export { ImagePost, TextPost };
