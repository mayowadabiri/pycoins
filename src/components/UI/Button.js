const Button = ({
  children,
  onclick,
  type,
  bg,
  disabled = true,
  isLoading,
}) => {
  return (
    <button
      disabled={!disabled || isLoading}
      className={["button", bg].join(" ")}
      onClick={onclick}
      type={type}
    >
      {isLoading ? "Please Wait..." : children}
    </button>
  );
};

export default Button;
