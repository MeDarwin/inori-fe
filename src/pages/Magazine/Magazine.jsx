import PropTypes from "prop-types";
import { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Await, useLoaderData } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FloatingActionButton from "../../components/FAB";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import MagazineAddForm from "../../components/magazine/AddForm";
import Card from "../../components/magazine/Card";
import { useGetMagazineQuery } from "../../reducer/services/magazineApi";
import { ErrorAsync } from "../ErrorElement";

const MagazineList = ({ items }) => {
  const user = useSelector((state) => state.auth.user);
  //for admin
  if (user?.role === "admin")
    return items?.map(({ id, title, created_at, creator_username, thumbnail, is_verified, verified_by, category }) => (
      <Card
        key={id}
        id={id}
        title={title}
        created_at={created_at}
        creator_username={creator_username}
        thumbnail={thumbnail}
        is_verified={is_verified}
        verified_by={verified_by}
        category={category}
      />
    ));
  //for normal user
  return items?.map(({ id, title, created_at, creator_username, post_schedule, thumbnail, is_verified, verified_by }) =>
    Number(new Date(post_schedule)) < Number(new Date()) && is_verified ? (
      <Card
        key={id}
        id={id}
        title={title}
        created_at={created_at}
        creator_username={creator_username}
        thumbnail={thumbnail}
        is_verified={is_verified}
        verified_by={verified_by}
      />
    ) : null
  );
};
MagazineList.propTypes = {
  items: PropTypes.array,
};

const Magazine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { magazine: magazineAwait } = useLoaderData();
  const { data } = useGetMagazineQuery();
  return (
    <>
      <ToastContainer autoClose={8000} />
      {/*  ------------------------------ ADMIN ACTION ------------------------------ */}
      <>
        <FloatingActionButton setIsOpen={setIsOpen} title="Add new magazine" />
        <MagazineAddForm isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
      {/* ------------------------------ ADMIN ACTION ------------------------------ */}

      {/*  ----------------------------- MAIN COMPONENT -----------------------------  */}
      <div className="container mx-auto pt-20 bg-[#fcf7f4]">
        <Suspense fallback={<Loading>Loading magazine...</Loading>}>
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
