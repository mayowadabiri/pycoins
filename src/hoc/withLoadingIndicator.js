import SmallLoader from "./../components/UI/SmallLoader";

const WithSmallLoader = ({ children, isLoading }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {children}
      <SmallLoader height={30} width={30} isLoading={isLoading} />
    </div>
  );
};

export default WithSmallLoader;
