import PropTypes from "prop-types";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FloatingActionButton from "../../components/FAB";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import CategoryAddForm from "../../components/category/AddForm";
import CategoryCard from "../../components/category/Card";
import { useGetCategoriesQuery } from "../../reducer/services/categoryApi";
import { ErrorAsync } from "../ErrorElement";

const CategoryList = ({ items }) => {
  return items?.map(({ name }) => <CategoryCard key={name} name={name} />);
};
CategoryList.propTypes = {
  items: PropTypes.array,
};

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { category: categoryAwait } = useLoaderData();
  const { data } = useGetCategoriesQuery();
  return (
    <>
      <ToastContainer />
      <FloatingActionButton setIsOpen={setIsOpen} title="Add new category" />
      <CategoryAddForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="container mx-auto pt-20 bg-[#fcf7f4]">
        <Title>
          <h1 className="text-red-800 sm:text-4xl mb-4">Category</h1>
        </Title>
        <Suspense fallback={<Loading>Loading category...</Loading>}>
          <Await errorElement={<ErrorAsync />} resolve={categoryAwait}>
            <div className="flex justify-between flex-wrap gap-4">
              <CategoryList items={data} />
            </div>
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default Category;
