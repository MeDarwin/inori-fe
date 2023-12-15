import PropTypes from "prop-types";
import { BsFillXCircleFill } from "react-icons/bs";
import Button from "../Button";
import Input from "../Input";

const MagazineAddForm = ({ isOpen, setIsOpen }) => {
  if (isOpen)
    return (
      <div className="absolute min-w-full bg-black bg-opacity-50 h-screen max-h-screen flex items-center overflow-y-auto">
        <div className="relative w-full sm:w-1/2 mx-auto bg-white px-4 py-6 rounded-lg">
          <span className="flex justify-end items-center text-red-800 text-sm mb-3">
            <h1 className="text-2xl mb-1 text-red-800 mr-auto">Add new magazine</h1>
            <BsFillXCircleFill className="inline-block cursor-pointer" size={20} onClick={() => setIsOpen(false)} />
          </span>
          <form>
            <label>
              <span>Title</span>
              <Input type="text" placeholder="Title" className="mb-3" />
            </label>
            <label>
              <span>Body</span>
              <textarea
                className="mb-3 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-800 focus:border-red-800 focus:z-10 sm:text-sm"
                cols="30"
                rows="10"
              ></textarea>
            </label>
            <label>
              <span>Footer</span>
              <Input type="text" placeholder="footer" className="mb-3" />
            </label>
            <label>
              <span>Post Schedule</span>
              <Input
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                placeholder="post_schedule"
                className="mb-3"
              />
            </label>
            <Button>Add</Button>
          </form>
        </div>
      </div>
    );
};
MagazineAddForm.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default MagazineAddForm;
