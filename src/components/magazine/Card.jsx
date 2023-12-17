import PropTypes from "prop-types";
import { BsTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from "../../config/app";
import { useDeleteMagazineMutation, useVerifyMagazineMutation } from "../../reducer/services/magazineApi";

const MagazineCard = ({ id, title, created_at, creator_username, thumbnail, is_verified, verified_by, category }) => {
  const user = useSelector((state) => state.auth.user);
  const [deleteMagazine, { isLoading }] = useDeleteMagazineMutation();
  const [verifyMagazine, { isLoading: isLoadingVerify }] = useVerifyMagazineMutation();

  const handleVerify = () => {
    verifyMagazine(id)
      .then(() => {
        toast.success("Magazine verified successfully");
      })
      .catch(() => {
        toast.error("Magazine not verified");
      });
  };

  const hanldeDelete = () => {
    deleteMagazine(id)
      .then(() => {
        toast.success("Magazine deleted successfully");
      })
      .catch(() => {
        toast.error("Magazine not deleted");
      });
  };

  return (
    <div>
      <div className="relative border bg-[#fff7ee] break-inside-avoid-column mb-3 px-3 py-2 rounded-md shadow-md shadow-red-900 hover:-translate-y-2 hover:shadow-red-900 hover:shadow-lg">
        <Link to={`/magazine/${id}`} key={id}>
          {thumbnail && (
            <img
              src={`${config.thumbnailUrl}/${thumbnail}`}
              alt={thumbnail}
              className="w-full m-auto rounded-md"
              draggable="false"
            />
          )}
          <h2 className="text-xl font-bold text-red-800">{title}</h2>
          <h6 className="text-xs text-gray-500">{created_at?.slice(0, -3)}</h6>
          <h4 className="text-base">Author: {creator_username}</h4>
          <p className="text-xs">Categories: {category?.map(({ name }) => name)}</p>
          {!is_verified ? (
            <p className="text-xs text-red-500">Not verified yet</p>
          ) : (
            <p className="text-xs">Verified by: {verified_by}</p>
          )}
        </Link>
        {user?.role == "admin" && (
          <div className="flex justify-between items-center">
            {!is_verified && (
              <label className="cursor-pointer">
                <input disabled={isLoadingVerify} type="checkbox" className="cursor-pointer" onChange={handleVerify} />
                <span className="ml-2 select-none">{isLoadingVerify ? "Verifying..." : "Verify"}</span>
              </label>
            )}
            <button disabled={isLoading} className="bg-[#fff7ee] mt-2" onClick={hanldeDelete}>
              <BsTrashFill className={isLoading ? "disabled:text-gray-500" : "text-red-800"} size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
MagazineCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  category: PropTypes.array,
  created_at: PropTypes.string,
  creator_username: PropTypes.string,
  verified_by: PropTypes.string,
  thumbnail: PropTypes.string,
  is_verified: PropTypes.number,
};

export default MagazineCard;
