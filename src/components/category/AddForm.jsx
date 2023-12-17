import PropTypes from "prop-types";
import { useState } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useAddCategoryMutation } from "../../reducer/services/categoryApi";
import Button from "../Button";
import Input from "../Input";

const CategoryAddForm = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState(null);
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    addCategory(name)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        e.target.reset();
      })
      .catch(({ data }) => {
        console.log(Object.values(data?.errors));
        Object.values(data?.errors).map((err) =>
          toast.error(err.toLocaleString(), { position: toast.POSITION.TOP_LEFT })
        );
      });
  };

  if (isOpen)
    return (
      <div className="fixed min-w-full bg-black bg-opacity-50 max-h-screen h-screen overflow-y-auto z-50">
        <div className="relative w-full mx-2 sm:mx-auto sm:w-1/2 bg-white px-4 py-6 rounded-lg max-h-full my-10">
          <span className="flex justify-end items-center text-red-800 text-sm mb-3 overflow-y-auto">
            <h1 className="text-2xl mb-1 text-red-800 mr-auto">Add new magazine</h1>
            <BsFillXCircleFill className="inline-block cursor-pointer" size={20} onClick={() => setIsOpen(false)} />
          </span>
          <form onSubmit={handleSubmit}>
            <label>
              <span className="after:content-['*'] after:text-red-400 after:ml-0.5">Category name</span>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
                className="mb-3"
              />
            </label>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </form>
        </div>
      </div>
    );
};
CategoryAddForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CategoryAddForm;
