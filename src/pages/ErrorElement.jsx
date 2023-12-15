import { useAsyncError } from "react-router-dom";

const titleBaseClass = "text-red-800 text-2xl";
export const ErrorAsync = () => {
  const error = useAsyncError();
  console.log(error);
  switch (error?.status) {
    case 500:
      return <div className={titleBaseClass}>Something went wrong with the server!</div>;

    default:
      return <div className={titleBaseClass}>Something unexpected happened! please contact the admin.</div>;
  }
};
