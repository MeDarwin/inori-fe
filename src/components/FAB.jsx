import PropTypes from "prop-types";

const FloatingActionButton = ({ setIsOpen, title }) => {
  return (
    <div className="fixed bottom-0 text-white right-0 bg-red-800 rounded-tl-lg z-40">
      <button onClick={() => setIsOpen(true)} className="px-4 py-1 group/fab relative w-max">
        + <span className="hidden group-hover/fab:inline-block">{title}</span>
      </button>
    </div>
  );
};
FloatingActionButton.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default FloatingActionButton;
