import { Link } from "react-router-dom";

const AuthFooter = ({ title, link, linkTitle }) => {
  return (
    <>
      <p className="ta mt-small auth_footer">
        <span className="small small_bg">{title}</span>
        <Link to={link} className="link ml-small">{linkTitle}</Link>
      </p>
    </>
  );
};

export default AuthFooter;
