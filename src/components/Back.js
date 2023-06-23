import { LeftArrow } from "../icons";
import { Link } from "react-router-dom";

const Back = ({ to, title }) => {
  return (
    <Link to={to} className="back">
      <div>
        <LeftArrow fill={"#333333"} />
      </div>
      <p className="title title-black">{title}</p>
    </Link>
  );
};
export default Back;
