import PropTypes from "prop-types";
import { useState } from "react";
import { BsArrowBarUp, BsFillXCircleFill, BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { magazineApi } from "../../reducer/services/magazineApi";
import Button from "../Button";
import Input from "../Input";

const MagazineAddForm = ({ isOpen, setIsOpen }) => {
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [footer, setFooter] = useState(null);
  const [postSchedule, setPostSchedule] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [addMagazine, { isLoading }] = magazineApi.useAddMagazineMutation();

  /**@param {import('react-toastify').ToastOptions} option */
  const notify = (type, msg, option = {}) => {
    toast[type](msg, option);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMagazine({ title, body, footer, postSchedule, thumbnail })
      .unwrap()
      .then((data) => {
        notify("success", data?.message);
        e.target.reset();
      })
      .catch(({ data }) => {
        Object.values(data?.errors).forEach((err) =>
          notify("error", err.toLocaleString(), { position: toast.POSITION.TOP_LEFT })
        );
      });
  };

  if (isOpen)
    return (
      <>
        <div className="fixed min-w-full bg-black bg-opacity-50 max-h-screen h-screen overflow-y-auto z-50">
          <div className="relative w-full mx-2 sm:mx-auto sm:w-1/2 bg-white px-4 py-6 rounded-lg my-10">
            <span className="flex justify-end items-center text-red-800 text-sm mb-3 overflow-y-auto">
              <h1 className="text-2xl mb-1 text-red-800 mr-auto">Add new magazine</h1>
              <BsFillXCircleFill className="inline-block cursor-pointer" size={20} onClick={() => setIsOpen(false)} />
            </span>
            <form onSubmit={handleSubmit}>
              <label>
                <span className="after:content-['*'] after:text-red-400 after:ml-0.5">Title</span>
                <Input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="mb-3" />
              </label>
              <label>
                <span className="after:content-['*'] after:text-red-800 after:ml-0.5">Body</span>
                <textarea
                  placeholder="Body"
                  onChange={(e) => setBody(e.target.value)}
                  className="mb-3 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-800 focus:border-red-800 focus:z-10 sm:text-sm"
                  cols="30"
                  rows="10"
                ></textarea>
              </label>
              <label>
                <span>Footer</span>
                <span className="text-xs ms-2 text-gray-500">optional</span>
                <Input type="text" onChange={(e) => setFooter(e.target.value)} placeholder="footer" className="mb-3" />
              </label>
              <label>
                <span>Post Schedule</span>
                <span className="text-xs ms-2 text-gray-500">optional</span>
                <Input
                  type="datetime-local"
                  onChange={(e) => setPostSchedule(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  placeholder="post_schedule"
                  className="mb-3"
                />
              </label>
              <label>
                <span>Thumbnail</span>
                <span className="group mb-3 w-fit rounded border border-red-800 cursor-pointer text-red-800 px-2 py-1 hover:bg-red-800 disabled:bg-gray-400 block">
                  <BsArrowBarUp className="group-hover:text-white inline-block text-red-800 me-3" size={20} />
                  <span className="group-hover:text-white">Upload File</span>
                </span>
                <input
                  type="file"
                  onInput={(e) => {
                    console.log(e.target.files,e.value);
                    setThumbnail(e.target.files[0]);
                    e.value = null;
                  }}
                  multiple={false}
                  className="hidden"
                  accept="image/*"
                  id="thumbnail"
                />
              </label>
              {thumbnail && <p className="inline-block me-3 break-all">Uploaded file : {thumbnail.name}</p>}
              {thumbnail && (
                <button
                  type="button"
                  className="group mb-5 rounded border hover:bg-red-800 hover:text-white border-red-800 text-red-800 p-1 px-2 w-fit"
                  onClick={() => setThumbnail(null)}
                >
                  <BsTrashFill className="inline-block group-hover:text-white text-red-800" size={20} />
                </button>
              )}
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Adding..." : "Add"}
              </Button>
            </form>
          </div>
        </div>
      </>
    );
};
MagazineAddForm.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default MagazineAddForm;
