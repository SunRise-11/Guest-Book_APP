import { PostType } from ".";
import UserTitle from "./UserTitle";

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

export default TextPost;
