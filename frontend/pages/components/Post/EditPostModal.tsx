/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { Dialog, Transition } from "@headlessui/react";
import { userAtom } from "../Login";
import { approvedPostsAtom, pendingPostsAtom } from "../..";
import requestAPI from "../../lib/requestAPI";
import { PostType } from ".";

export const EditPostModalOpen = atom<{
  open: boolean;
  post: PostType | undefined;
}>({
  open: false,
  post: undefined,
});

const EditPostModal: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [modal, setModal] = useAtom(EditPostModalOpen);
  const [data, setData] = useState<string | undefined>();
  const [approvedPosts, setApprovedPosts] = useAtom(approvedPostsAtom);
  const [pendingPosts, setPendingPosts] = useAtom(pendingPostsAtom);

  const resetEditPost = () => {
    setData(undefined);
    setModal({
      open: false,
      post: undefined,
    });
  };

  useEffect(() => {
    setData(modal?.post?.data);
  }, [modal]);

  const handleUpdatePost = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    requestAPI
      .put("/post", {
        id: modal?.post?.id,
        data,
      })
      .then((res) => {
        if (res.status === 200) {
          resetEditPost();
          if (user?.isAdmin) {
            setApprovedPosts([...approvedPosts, res.data]);
            setApprovedPosts(
              approvedPosts.map((p) =>
                p.id === modal?.post?.id ? res.data : p
              )
            );
            setPendingPosts(
              pendingPosts.map((p) => (p.id === modal?.post?.id ? res.data : p))
            );
          }
        } else {
          throw new Error("unable to create post");
        }
      });
  };

  const handleDeletePost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.preventDefault();
    const res = await requestAPI.delete("/post/", {
      data: modal?.post?.id,
    });
    if (res.status === 200) {
      resetEditPost();
      setApprovedPosts(approvedPosts.filter((p) => p.id !== modal?.post?.id));
      setPendingPosts(pendingPosts.filter((p) => p.id !== modal?.post?.id));
    }
  };

  return (
    <Transition.Root show={modal.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => setModal({ ...modal, open: false })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg p-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                <div className="post_input">
                  <div className="text_input">
                    {modal?.post?.type === "image" ? (
                      <>
                        <img
                          src={`http://localhost:8080/api/image/get/${modal?.post?.data}`}
                          className="object-cover"
                          alt="image upload"
                        />
                      </>
                    ) : (
                      <textarea
                        placeholder="Write something here..."
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                      ></textarea>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="submit"
                      disabled={
                        data === undefined ||
                        data === "" ||
                        modal?.post?.type === "image"
                      }
                      onClick={(e: React.MouseEvent<HTMLElement>) =>
                        handleUpdatePost(e)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      disabled={data === undefined || data === ""}
                      onClick={(e: React.MouseEvent<HTMLElement>) =>
                        handleDeletePost(e)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditPostModal;
