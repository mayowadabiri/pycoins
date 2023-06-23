import useWidth from "../../hooks/windowWidth";

const PersonalIndicator = ({ indicate }) => {
  const [width] = useWidth();

  return (
    <div className="indicator " style={{ width: "60%" }}>
      <div className="indicator_content">
        <div className="indicator_item">
          <span className="indicator_item-circle">
            <span></span>
          </span>
          <span className="indicator_item-line">
            <span
              style={
                indicate ? { backgroundColor: "#48D189", width: "100%" } : {}
              }
            ></span>
          </span>
        </div>
        {width > 500 && (
          <p style={{ fontWeight: "bold" }}>Personal/Account Info</p>
        )}
      </div>
      <div className="indicator_content">
        <span className="indicator_item-circle">
          <span style={indicate ? { backgroundColor: "#48D189" } : {}}></span>
        </span>
        {width > 500 && (
          <p style={{ marginTop: "1rem", fontWeight: indicate && "bold" }}>
            Create Account
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalIndicator;
