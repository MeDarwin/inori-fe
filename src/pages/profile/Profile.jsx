import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Title from "../../components/Title";
import Card from "../../components/magazine/Card";

const UserMagazineList = ({ items }) => {
  console.log(items);
  return items.map(({ id, title, created_at, creator_username, thumbnail, is_verified, verified_by }) => (
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

      <div className="columns-[10rem]">{user?.magazine.length > 0 && <UserMagazineList items={user.magazine} />}</div>
    </div>
  );
};

export default Profile;
