import useWidth from "../../hooks/windowWidth";
const Indicator = ({ show_1, show_2 }) => {
  const [width] = useWidth();

  return (
    <div className="indicator ">
      <div className="indicator_content">
        <div className="indicator_item">
          <span className="indicator_item-circle">
            <span></span>
          </span>
          <span className="indicator_item-line">
            <span
              style={
                show_1 ? { backgroundColor: "#48D189", width: "100%" } : {}
              }
            ></span>
          </span>
        </div>
        {width > 800 && (
          <p style={{ fontWeight: "bold" }}>Business Information</p>
        )}
      </div>
      <div className="indicator_content">
        <div className="indicator_item">
          <span className="indicator_item-circle">
            <span style={show_1 ? { backgroundColor: "#48D189" } : {}}></span>
          </span>
          <span className="indicator_item-line">
            <span
              style={
                show_2 ? { backgroundColor: "#48D189", width: "100%" } : {}
              }
            ></span>
          </span>
        </div>
        {width > 800 && (
          <p style={show_1 ? { fontWeight: "bold" } : {}}>
            Personal/Account Info
          </p>
        )}
      </div>
      <div className="indicator_content">
        <div>
          <span className="indicator_item-circle">
            <span style={show_2 ? { backgroundColor: "#48D189" } : {}}></span>
          </span>
        </div>
        {width > 800 && (
          <p style={{ marginTop: "1rem", fontWeight: show_2 && "bold" }}>
            Create Account
          </p>
        )}
      </div>
    </div>
  );
};

export default Indicator;
