import Error from "./../components/Error";

const WithErrorComponent = ({ children, isError }) => {
  return <>{isError ? <Error /> : children}</>;
};

export default WithErrorComponent;
