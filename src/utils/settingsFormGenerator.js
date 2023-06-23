import SettingsForm from "../components/Settings/Form";
import { changeHandler, handleBlur, showPassword } from "./changeHandler";

const settingsFormGenerator = (formType, formFunc, validForm) => {
  const formArr = [];
  for (let key in formType) {
    formArr.push({
      id: key,
      config: formType[key],
    });
  }

  const form = formArr.map(({ id, config }) => (
    <SettingsForm
      key={id}
      label={config.label}
      type={config.type}
      value={config.value}
      onchange={(evt) => changeHandler(evt, id, formType, formFunc, validForm)}
      onblur={() => handleBlur(id, formType, formFunc)}
      valid={config.valid}
      blur={config.blur}
      info={config.info}
      show={config.show}
      image={config.image}
      elementType={config.elementType}
      showPassword={(evt) => showPassword(evt, id, formType, formFunc)}
      readonly={config.readonly}
    />
  ));

  return form;
};

export default settingsFormGenerator;
