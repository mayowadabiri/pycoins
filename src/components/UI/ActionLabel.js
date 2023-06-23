const ActionLabel = ({ children, text, style, onclick }) => {
  return (
    <div className={`fund_wallet  ${style}`}>
      <div className={"fund_wallet-text"}>
        <p className="title title-grey">{text}</p>
      </div>
      <div className="fund_wallet-svg" onClick={onclick}>
        {children}
      </div>
    </div>
  );
};

export default ActionLabel;
