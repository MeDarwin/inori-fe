import PropTypes from "prop-types";

const buttonClass =
  "rounded bg-red-800 text-white px-4 py-2 w-full font-bold enabled:hover:bg-red-900 disabled:bg-gray-400";

/**
 * For intellisense and autocomplete.
 * @param {React.AllHTMLAttributes<HTMLInputElement>} props - The props object containing the type property.
 * @return {JSX.Element} - The input component.
 */
const Button = (props) => {
  const chidlren = props.children;
  return (
    <button {...props} className={props.className ? `${buttonClass} ${props.className}` : buttonClass}>
      {chidlren}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
