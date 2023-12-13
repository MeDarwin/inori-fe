import PropTypes from "prop-types";

const Title = ({children}) => {
  return (
    <div className="font-bold sm:text-2xl text-xl">
      {children}
    </div>
  );
};
Title.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Title;
