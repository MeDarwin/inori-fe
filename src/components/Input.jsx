import PropTypes from "prop-types";

const inputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-800 focus:border-red-800 focus:z-10 sm:text-sm";

/**
 * For intellisense and autocomplete.
 * @param {React.AllHTMLAttributes<HTMLInputElement>} props - The props object containing the type property.
 * @return {JSX.Element} - The input component.
 */
const Input = (props) => {
  return <input {...props} className={props.className ? `${inputClass} ${props.className}` : inputClass} />;
};

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
