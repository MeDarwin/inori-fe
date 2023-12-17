import PropTypes from "prop-types";

const Loading = ({ children }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute animate-spin ease-linear rounded-full border-4 border-l-transparent border-red-800 border-opacity-50 h-8 w-8"></div>
      <div className="absolute animate-[spin_1s_linear_infinite_reverse] ease-linear rounded-full border-4 border-r-transparent border-opacity-50 border-red-800 h-8 w-8"></div>
      <div className="translate-x-10">{children}</div>
    </div>
  );
};
Loading.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Loading;
