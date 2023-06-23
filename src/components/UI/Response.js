const Response = ({ img, title, text, children }) => {
  return (
    <div className="response">
      <img src={img} alt="Success" className="mb-small" />
      <h3 className="title title-black mb-small">{title}</h3>
      <p className="title title-grey ta mb-small">{text}</p>
      {children && children}
    </div>
  );
};

export default Response;
