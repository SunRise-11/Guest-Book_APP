/* eslint-disable @next/next/no-img-element */
import { PostType } from ".";
import UserTitle from "./UserTitle";

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

export default ImagePost;
