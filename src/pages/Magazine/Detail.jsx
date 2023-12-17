/* eslint-disable no-useless-escape */
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Await, useLoaderData, useParams } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import { config } from "../../config/app";
import { useGetCategoriesQuery } from "../../reducer/services/categoryApi";
import {
  useAddCategoryToMagazineMutation,
  useDeleteCategoryFromMagazineMutation,
  useGetMagazineByIdQuery,
} from "../../reducer/services/magazineApi";
import { ErrorAsync } from "../ErrorElement";

const urlRegExp =
  /((?:(?:(?:[A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)(?:(?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?))/g;

const MagazineDetail = () => {
  const { magazineDetail: magazineDetailAwait, category: categoryAwait } = useLoaderData();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { data } = useGetMagazineByIdQuery(id);
  const { data: category } = useGetCategoriesQuery();
  const [addCategory, { isLoading: addLoading }] = useAddCategoryToMagazineMutation();
  const [deleteCategory, { isLoading: deleteLoading }] = useDeleteCategoryFromMagazineMutation();

  const replacedFooter = reactStringReplace(data?.footer, urlRegExp, (match, i) => (
    <a className="text-blue-800" href={match} key={i} target="_blank" rel="noreferrer">
      {match}
    </a>
  ));

  const handleToggleCategory = (name) => {
    if (data?.category.filter(({ name: filterName }) => filterName === name).length > 0) {
      return deleteCategory({ categoryName: name, magazineId: id })
        .unwrap()
        .then((res) => toast.success(res.message || "Category deleted successfully"))
        .catch((err) => toast.error(err.data.message));
    }
    return addCategory({ categoryName: name, magazineId: id })
      .unwrap()
      .then((res) => toast.success(res.message || "Category added successfully"))
      .catch((err) => toast.error(err.data.message));
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto pt-20 bg-[#fcf7f4]">
        <Suspense fallback={<Loading>Loading magazine...</Loading>}>
          <Await resolve={magazineDetailAwait} errorElement={<ErrorAsync />}>
            <article className="prose prose-h1:text-red-800 min-w-full pb-10">
              <h1 className="mb-0">{data?.title}</h1>
              <h6 className=" text-gray-500 italic">Author - {data?.creator_username}</h6>
              <p className="m-0">{data?.created_at.slice(0, -3)}</p>
              <div className="text-sm">
                Category:
                {data?.category.length === 0 && <p>Uncategorized</p>}
                {data?.category.map(({ name }) => (
                  <p key={name} className="m-0">
                    {name},
                  </p>
                ))}
              </div>
              <div className="border-b-2"></div>
              {data?.thumbnail && (
                <img
                  src={`${config.thumbnailUrl}/${data?.thumbnail}`}
                  className="max-h-96 h-96 mx-auto rounded-lg"
                  alt={data?.thumbnail}
                />
              )}
              <p className="whitespace-pre-wrap">{data?.body}</p>
              <p className="whitespace-pre-wrap">{replacedFooter}</p>
            </article>
            {user?.username === data?.creator_username && (
              <Suspense fallback={<Loading>Loading category...</Loading>}>
                <Await resolve={categoryAwait} errorElement={<ErrorAsync />}>
                  <div>
                    <Title>
                      <h1 className="text-red-800 sm:text-xl">Add category to magazine</h1>
                      <h6 className="font-normal text-gray-500 text-sm mb-4">Click again to delete from magazine</h6>
                    </Title>
                    {(addLoading || deleteLoading) && <Loading>Saving...</Loading>}
                    <div className="flex justify-between flex-wrap gap-4 pb-20 mt-4">
                      {category?.map(({ name }) => (
                        <button
                          key={name}
                          className="cursor-pointer border hover:-translate-y-1 shadow-md hover:shadow-red-800 bg-white rounded-lg px-3 py-2"
                          onClick={() => handleToggleCategory(name)}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </Await>
              </Suspense>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default MagazineDetail;
