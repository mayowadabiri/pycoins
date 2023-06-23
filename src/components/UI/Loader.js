import Loader from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="loading">
      <Loader type="Oval" color="#48d189" height={"5rem"} width={"5rem"} />
    </div>
  );
};
export default Loading;
