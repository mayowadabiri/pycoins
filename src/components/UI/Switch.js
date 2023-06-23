import Switch from "react-switch";

const Toggle = ({
  checked = false,
  toggle,
  param,
  disabled,
  height,
  width,
  offColor,
  offHandleColor,
}) => {
  return (
    <label className="toggle">
      <Switch
        onChange={() => toggle(param)}
        checked={checked}
        offHandleColor={offHandleColor}
        offColor={offColor}
        onColor="#48D189"
        checkedIcon={false}
        uncheckedIcon={false}
        disabled={disabled}
        height={height}
        width={width}
        // handleDiameter={10}
        // borderRadius={30}
      />
    </label>
  );
};

export default Toggle;
