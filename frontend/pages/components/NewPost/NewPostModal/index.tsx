/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { useAtom } from "jotai";
import { Dialog, Transition } from "@headlessui/react";
import { PhotographIcon, XIcon } from "@heroicons/react/solid";
import requestAPI from "../../../lib/requestAPI";
import { pendingPostsAtom } from "../../..";

import Compress from "compress.js";
import { userAtom } from "../../Login";

const NewPostModal: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [user] = useAtom(userAtom);
  const [data, setData] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageData, setImageData] = useState<Blob | undefined>(undefined);
  const [pendingPosts, setPendingPosts] = useAtom(pendingPostsAtom);

  const imageUploadRef = useRef<HTMLInputElement>(null);

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      setImageData(file);
    }
  };

  const resetNewPost = () => {
    setData(undefined);
    setImage(undefined);
    setImageData(undefined);
    setOpen(false);
  };

  const handleImageUpload = async (e: React.MouseEvent<HTMLElement>) => {
    // upload image
    if (imageData) {
      const compress = new Compress();
      const compressedImage = await compress.compress(
        [new File([imageData], "name")],
        {
          size: 4, // the max size in MB, defaults to 2MB
          quality: 0.75, // the quality of the image, max is 1,
          maxWidth: 600, // the max width of the output image, defaults to 1920px
          maxHeight: 600, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
        }
      );

      const form = new FormData();
      form.append(
        "image",
        Compress.convertBase64ToFile(compressedImage[0].data)
      );

      await requestAPI.post("/image/upload", form).then(async (res) => {
        if (res.data.message) {
          const resPostCreation = await requestAPI.post("/post", {
            type: "image",
            data: res.data.message,
          });

          if (resPostCreation.status === 201) {
            resetNewPost();

            if (user?.isAdmin) {
              setPendingPosts([...pendingPosts, resPostCreation.data]);
            }
          } else {
            throw new Error("unable to create post");
          }
        }
      });
    }
  };

  const handleCreatePost = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    requestAPI
      .post("/post", {
        type: "text",
        data,
      })
      .then((res) => {
        if (res.status === 201) {
          resetNewPost();
          setPendingPosts([...pendingPosts, res.data]);
        } else {
          throw new Error("unable to create post");
        }
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
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
              <Dialog.Panel className="relative bg-white rounded-lg p-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div className="post_input">
                  <div className="text_input">
                    {image ? (
                      <>
                        <button
                          onClick={() => setImage(undefined)}
                          className="absolute m-2 p-2 top-0 right-0 rounded-full transition-colors bg-stone-200 hover:bg-blue-500 hover:text-white"
                        >
                          <XIcon className="w-6 h-6" />
                        </button>
                        <img
                          src={image}
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
                    <div className="col-span-1 h-12 flex items-center">
                      <input
                        ref={imageUploadRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFileInputChange(e)}
                      />
                      <button
                        onClick={(e) =>
                          imageUploadRef.current &&
                          imageUploadRef.current.click()
                        }
                        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-stone-100 hover:bg-stone-200"
                      >
                        <span className="text-lg font-medium leading-none text-stone-600 uppercase">
                          <PhotographIcon className="w-6 h-6" />
                        </span>
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        (data === undefined || data === "") && image === null
                      }
                      onClick={(e: React.MouseEvent<HTMLElement>) =>
                        image ? handleImageUpload(e) : handleCreatePost(e)
                      }
                    >
                      Post
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

export default NewPostModal;
