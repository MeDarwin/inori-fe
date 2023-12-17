import PropTypes from "prop-types";
import { BsTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryCard = ({ name }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div
      key={name}
      className="border hover:-translate-y-1 shadow-md hover:shadow-red-800 bg-white rounded-lg px-3 py-2"
    >
      <Link to={`/category/${name}`} className="inline-block">
        {name}
      </Link>
      {user?.role == "admin" && <BsTrashFill size={20} className="text-red-800 cursor-pointer inline-block ml-3" />}
    </div>
  );
};
CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CategoryCard;
