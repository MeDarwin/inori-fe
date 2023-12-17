import { Suspense } from "react";
import { Await, useLoaderData, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import MagazineCard from "../../components/magazine/Card";
import { useGetCategoryByNameQuery } from "../../reducer/services/categoryApi";
import { ErrorAsync } from "../ErrorElement";

const CategoryDetail = () => {
  const { categoryDetail: categoryDetailAwait } = useLoaderData();
  const { name } = useParams();
  const { data } = useGetCategoryByNameQuery(name);
  return (
    <div className="container mx-auto pt-20 bg-[#fcf7f4]">
      <Suspense fallback={<Loading>Loading category...</Loading>}>
        <Await resolve={categoryDetailAwait} errorElement={<ErrorAsync />}>
          <Title>
            <h1 className="text-red-800 sm:text-4xl mb-4 capitalize">{data?.name}</h1>
          </Title>
          {data?.magazine.map(
            ({ id, category, created_at, creator_username, is_verified, thumbnail, title, verified_by }) => (
              <div key={id} className="columns-[14rem] gap-x-8 pb-10">
                <MagazineCard
                  category={category}
                  created_at={created_at}
                  creator_username={creator_username}
                  id={id}
                  is_verified={is_verified}
                  thumbnail={thumbnail}
                  title={title}
                  verified_by={verified_by}
                />
              </div>
            )
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default CategoryDetail;
