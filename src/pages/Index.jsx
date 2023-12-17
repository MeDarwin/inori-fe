import { Suspense } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Title from "../components/Title";
import CategoryCard from "../components/category/Card";
import MagazineCard from "../components/magazine/Card";
import { useGetCategoriesQuery } from "../reducer/services/categoryApi";
import { useGetMagazineQuery } from "../reducer/services/magazineApi";
import { ErrorAsync } from "./ErrorElement";

const Index = () => {
  const { magazine: magazineAwait, category: categoryAwait } = useLoaderData();
  const navigate = useNavigate();
  const { data: magazine } = useGetMagazineQuery();
  const { data: category } = useGetCategoriesQuery();
  return (
    <>
      <div className="min-w-screen bg-cover h-64 bg-repeat-x bg-auto border-b-8 border-red-800"></div>
      <div className="container mx-auto bg-[#fcf7f4]">
        <Button
          className="rounded-tl-none rounded-tr-none rounded-br-3xl rounded-bl-3xl"
          onClick={() => navigate("/category")}
        >
          See all cetagory
        </Button>
        <div className="flex flex-col">
          <Title>
            <h1 className="text-red-800 sm:text-4xl mb-4">Magazine</h1>
          </Title>
          <Suspense fallback={<Loading>Loading magazine...</Loading>}>
            <Await resolve={magazineAwait} errorElement={<ErrorAsync />}>
              <div className="columns-[14rem] gap-x-8 pb-10">
                {magazine?.map(
                  ({
                    id,
                    title,
                    created_at,
                    post_schedule,
                    creator_username,
                    category,
                    thumbnail,
                    is_verified,
                    verified_by,
                  }) => {
                    return Number(new Date(post_schedule)) < Number(new Date()) && is_verified ? (
                      <MagazineCard
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
                    ) : null;
                  }
                )}
              </div>
            </Await>
          </Suspense>
        </div>
        <div className="flex flex-col pb-20">
          <Title>
            <h1 className="text-red-800 sm:text-4xl mb-4">Category</h1>
          </Title>
          <Suspense fallback={<Loading>Loading category...</Loading>}>
            <Await resolve={categoryAwait} errorElement={<ErrorAsync />}>
              <div className="flex justify-between flex-wrap gap-4">
                {category?.map(({ name }) => (
                  <CategoryCard key={name} name={name} />
                ))}
              </div>
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Index;
