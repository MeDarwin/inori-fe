import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { config } from "../../config/app";

const UserMagazineList = ({ items }) => {
  console.log(items);
  return items.map(({ id, title, created_at, creator_username, thumbnail }) => (
    <div key={id}>
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
        </Link>
      </div>
    </div>
  ));
};
UserMagazineList.propTypes = {
  items: PropTypes.array,
};

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="container mx-auto pt-20 bg-[#fcf7f4]">
      <Title>
        <h1 className="text-red-800 sm:text-4xl">Profile</h1>
      </Title>
      <h2 className="text-lg text-red-800">Username: {user?.username}</h2>
      <p>Email: {user?.email}</p>
      <div className="border-b-2 mb-3 border-red-800"></div>
      <div className="columns-[10rem]">{user?.magazine.length > 0 && <UserMagazineList items={user.magazine} />}</div>
    </div>
  );
};

export default Profile;
