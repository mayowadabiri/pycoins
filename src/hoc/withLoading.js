import Loading from "./../components/UI/Loader";

const WithLoadingComponent = ({ children, isLoading }) => {
  return !isLoading ? children : <Loading />;
};

export default WithLoadingComponent;
