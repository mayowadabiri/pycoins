const Label = ({ title, id, onchange, checked, ...props }) => {
  return (
    <div>
      <input
        value={id}
        id={id}
        className="label_input"
        onChange={onchange}
        {...props}
        checked={checked}
      />
      <label htmlFor={id} className="label_label">
        <span></span>
        <p className="title title-grey">{title}</p>
      </label>
    </div>
  );
};

export default Label;
