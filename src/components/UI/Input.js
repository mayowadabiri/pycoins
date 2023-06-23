// import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-input-2";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import "react-phone-input-2/lib/material.css";

const useStyles = makeStyles(() => ({
  root: {
    "&": {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        fontSize: "1.1rem",
        "& fieldset": {
          borderColor: "#e5e9f2",
          borderRadius: "8px",
        },

        "&.Mui-focused fieldset": {
          borderColor: "#e5e9f2",
        },

        "&:hover fieldset": {
          borderColor: "#e5e9f2",
        },

        "&.Mui-error:hover fieldset": {
          borderColor: "#f44336",
        },
      },
      "& label": {
        fontSize: "1rem",
        fontFamily: "Mulish , sans-serif",
        color: "#30324b",
      },
      "& label.Mui-focused": {
        color: "#48d189",
        fontFamily: "Mulish , sans-serif",
      },
      "& MuiChip-label": {
        color: "#30324b",
      },
    },
  },
}));

const Input = ({
  value,
  type,
  elementType,
  placeholder,
  info,
  svg,
  id,
  label,
  options,
  onchange,
  required,
  blur,
  onblur,
  valid,
  showPassword,
  show,
  readonly,
  multiple,
  removeSelect,
  selected,
  closeMenu,
  isLoading,
  displayedValue,
}) => {
  // const [seleted, setSelected] = useState([]);

  const handleChange = (values) => {
    onchange(values);
  };
  const classes = useStyles();

  let inputElement;
  switch (elementType) {
    case "input":
      inputElement = (
        <>
          <div style={{ position: "relative" }}>
            <TextField
              error={blur && !valid}
              className={classes.root}
              label={label}
              variant="outlined"
              onChange={onchange}
              required={required}
              onBlur={onblur}
              type={type}
              value={value === "NaN" ? "" : value}
              disabled={readonly}
            />
            {svg && (
              <img
                onClick={showPassword}
                src={svg}
                alt="show password"
                className="form_img"
              />
            )}
          </div>
          {info && <p className="small small-red">{info}</p>}
        </>
      );
      break;

    case "select":
      inputElement = (
        <Autocomplete
          sx={{ width: 300 }}
          options={options}
          autoHighlight
          className={classes.root}
          getOptionLabel={(option) => option.label}
          onChange={(event, value) => handleChange(value)}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      );
      break;
    case "multiple":
      inputElement = (
        <Autocomplete
          multiple
          id="tags-outlined"
          sx={{ width: 300 }}
          options={options || []}
          filterSelectedOptions
          className={classes.root}
          getOptionLabel={(option) => option.label}
          onChange={(event, value) => handleChange(value)}
          // onClose={closeMenu}
          freeSolo={true}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password firstName lastName", // disable autocomplete and autofill
              }}
            />
          )}
        />
      );
      break;

    case "phone":
      inputElement = (
        <PhoneInput
          containerClass="container-phone"
          inputClass={`input-phone ${blur && !valid && "error-phone"}`}
          buttonClass="button-phone"
          country={"us"}
          value={value}
          dropdownClass="dropdown-phone"
          onChange={onchange}
          onBlur={onblur}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className="form_textarea"
          placeholder={placeholder}
          value={value}
          rows="7"
          required
          onChange={onchange}
        ></textarea>
      );
      break;
    case "date":
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Basic example"
          value={value}
          onChange={(newValue) => {
            handleChange(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>;

      break;
    case "file":
      inputElement = (
        <>
          <div style={{ position: "relative" }}>
            <input
              id="upload"
              type="file"
              className="form_upload-input"
              onChange={onchange}
              accept=".doc,.docx,.pdf"
            />
            <label htmlFor="upload" className="form_upload-label">
              <span>{label}</span>
            </label>
            <img src={svg} alt="upload document" className="form_img" />
          </div>
          {info && <p className="small small-red">{info}</p>}
        </>
      );
      break;
    default:
      inputElement = <input />;
      break;
  }

  return <div className="form_group">{inputElement}</div>;
};

export default Input;
