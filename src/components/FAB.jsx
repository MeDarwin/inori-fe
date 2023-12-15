import PropTypes from "prop-types";

const FloatingActionButton = ({ setIsOpen }) => {
  return (
    <div className="fixed bottom-0 text-white right-0 bg-red-800 rounded-tl-lg">
      <button onClick={() => setIsOpen(true)} className="px-4 py-1 group/fab relative w-max">
        + <span className="hidden group-hover/fab:inline-block">Add magazine</span>
      </button>
    </div>
  );
};
FloatingActionButton.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default FloatingActionButton;
