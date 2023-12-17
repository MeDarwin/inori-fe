import { Suspense } from "react";
import { Await, useLoaderData, useParams } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import Loading from "../../components/Loading";
import { config } from "../../config/app";
import { useGetMagazineByIdQuery } from "../../reducer/services/magazineApi";
import { ErrorAsync } from "../ErrorElement";

const MagazineDetail = () => {
  const { magazineDetail: magazineDetailAwait } = useLoaderData();
  const { id } = useParams();
  const { data } = useGetMagazineByIdQuery(id);
  const urlRegExp =
    // eslint-disable-next-line no-useless-escape
    /((?:(?:(?:[A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)(?:(?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?))/g;
  const replacedFooter = reactStringReplace(data?.footer, urlRegExp, (match, i) => (
    <a className="text-blue-800" href={match} key={i} target="_blank" rel="noreferrer">
      {match}
    </a>
  ));
  return (
    <div className="container mx-auto pt-20 bg-[#fcf7f4]">
      <Suspense fallback={<Loading>Loading magazine...</Loading>}>
        <Await resolve={magazineDetailAwait} errorElement={<ErrorAsync />}>
          <article className="prose prose-h1:text-red-800 min-w-full pb-20">
            <h1 className="mb-0">{data?.title}</h1>
            <h6 className=" text-gray-500 italic">Author - {data?.creator_username}</h6>
            <p className="m-0">{data?.created_at.slice(0, -3)}</p>
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
        </Await>
      </Suspense>
    </div>
  );
};

export default MagazineDetail;
