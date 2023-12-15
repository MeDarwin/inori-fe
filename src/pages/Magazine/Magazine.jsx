import PropTypes from "prop-types";
import { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Await, Link, useLoaderData } from "react-router-dom";
import FloatingActionButton from "../../components/FAB";
import Title from "../../components/Title";
import MagazineAddForm from "../../components/magazine/AddForm";
import { config } from "../../config/app";
import { useGetMagazineQuery } from "../../reducer/services/magazineApi";
import { ErrorAsync } from "../ErrorElement";

const MagazineList = ({ items }) => {
  return items.map(
    ({ id, title, created_at, creator_username, post_schedule, thumbnail }) =>
      Number(new Date(post_schedule)) < Number(new Date()) && (
        <Link to={`/magazine/${id}`} key={id} draggable>
          <div
            className="border bg-[#fff7ee] break-inside-avoid-column mb-3 px-3 py-2 rounded-md shadow-md shadow-red-900 hover:-translate-y-2 hover:shadow-red-900 hover:shadow-lg"
          >
            {thumbnail && (
              <img src={`${config.thumbnailUrl}/${thumbnail}`} alt={thumbnail} className="w-full m-auto rounded-md" />
            )}
            <h2 className="text-xl font-bold text-red-800">{title}</h2>
            <h6 className="text-xs text-gray-500">{created_at}</h6>
            <h4 className="text-base">Author: {creator_username}</h4>
          </div>
        </Link>
      )
  );
};
MagazineList.propTypes = {
  items: PropTypes.array,
};

const Magazine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { magazine: magazineAwait } = useLoaderData();
  const user = useSelector((state) => state.auth.user);
  const { data } = useGetMagazineQuery();
  console.log(data);
  return (
    <>
      {/*  ------------------------------ ADMIN ACTION ------------------------------ */}
      {user?.role == "admin" && (
        <>
          <FloatingActionButton setIsOpen={setIsOpen} />
          <MagazineAddForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
      {/* ------------------------------ ADMIN ACTION ------------------------------ */}

      {/*  ----------------------------- MAIN COMPONENT -----------------------------  */}
      <div className="container mx-auto pt-20 bg-[#fcf7f4] cursor-pointer">
        <Suspense fallback="loading...">
          <Title>
            <h1 className="text-red-800 sm:text-4xl mb-4">Magazine</h1>
          </Title>
          <Await resolve={magazineAwait} errorElement={<ErrorAsync />}>
            <div className="columns-[14rem] gap-x-8 pb-10">
              <MagazineList items={data} />
            </div>
          </Await>
        </Suspense>
      </div>
      {/*  ----------------------------- MAIN COMPONENT -----------------------------  */}
    </>
  );
};

export default Magazine;
