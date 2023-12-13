import PropTypes from "prop-types";

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns
 */
const LoadingScreen = ({ children }) => {
  return (
    <div className="fixed backdrop-blur-md top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-[#fcf7f4] bg-opacity-50">
      <div className="relative flex items-center">
        <div className="absolute -left-10 animate-spin ease-linear rounded-full border-4 border-l-transparent border-red-800 border-opacity-50 h-8 w-8"></div>
        <div className="absolute -left-10 animate-[spin_1s_linear_infinite_reverse] ease-linear rounded-full border-4 border-r-transparent border-opacity-50 border-red-800 h-8 w-8"></div>
        <div>{children}</div>
      </div>
    </div>
  );
};
LoadingScreen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingScreen;
