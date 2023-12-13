import PropTypes from "prop-types";

const logoClass = "text-center font-bold font-display";

/**
 * For intellisense and autocomplete.
 * @param {React.AllHTMLAttributes<HTMLHeadingElement>} props
 * @returns {JSX.Element}
 */
const LogoKanji = (props) => {
  return (
    <h1 {...props} className={props.className ? `${logoClass} ${props.className}` : logoClass}>
      祷り.
    </h1>
  );
};

LogoKanji.propTypes = {
  className: PropTypes.string,
};
export default LogoKanji;
