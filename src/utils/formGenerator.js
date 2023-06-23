import Input from '../components/UI/Input';
import {
  changeHandler,
  handleBlur,
  showPassword,
  removeItem,
} from './changeHandler';

const formGenerator = (formType, formFunc, validForm) => {
  const formArr = [];
  for (let key in formType) {
    formArr.push({
      id: key,
      config: formType[key],
    });
  }

  const form = formArr.map(({ id, config }) => (
    <Input
      key={id}
      id={id}
      value={config.value}
      valid={config.valid}
      type={config.type}
      elementType={config.elementType}
      placeholder={config.placeholder}
      info={config.info}
      svg={config.image}
      options={config.options}
      label={config.label}
      onChange={(event) =>
        changeHandler(event, id, formType, formFunc, validForm)
      }
      onblur={(event) => handleBlur(id, formType, formFunc)}
      removeSelect={(option) =>
        removeItem(option, id, formType, formFunc, validForm)
      }
      required={config.required}
      blur={config.blur}
      showPassword={(evt) => showPassword(evt, id, formType, formFunc)}
      show={config.show}
      multiple={config.singleSelect}
      readonly={config.readonly}
      selected={config.selected}
      isLoading={config.loading}
      displayedValue={config.displayedValue}
    />
  ));
  return form;
};

export default formGenerator;
