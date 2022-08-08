/* eslint-disable @next/next/no-img-element */
import { PostType } from ".";
import TimeAgo from "../TimeAgo";

const TextPost: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <>
      <div className={`flex justify-between items-start`}>
        <div className="flex space-x-3">
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
      </div>
      <p className="pt-4">{post.data}</p>
    </>
  );
};

const ImagePost: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <>
      <div className={`flex justify-between items-start`}>
        <div className="flex space-x-3">
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
