import { useContext, useMemo, useState } from "react";

import { AppContext } from "./../../context/index";

import useWebHookForm from "../../hooks/webHookForm";

import ActionLabel from "./../UI/ActionLabel";
import Button from "./../UI/Button";

import settingsFormGenerator from "./../../utils/settingsFormGenerator";
import { converToAsterik } from "./../../utils/asterik";
import handleCopy from "../../utils/copyToClipboard";

import { Copy, View } from "./../../icons/index";

const Webhooks = () => {
  const [liveShow, setLiveShow] = useState(false);
  const [testShow, setTestShow] = useState(false);

  const { apiKeys } = useContext(AppContext);

  const [
    liveForm,
    setLiveForm,
    // liveFormValid,
    setLiveFormValid,
    testForm,
    setTestForm,
    // testFormValid,
    setTestFormValid,
  ] = useWebHookForm();

  const liveform = settingsFormGenerator(
    liveForm,
    setLiveForm,
    setLiveFormValid
  );
  const testform = settingsFormGenerator(
    testForm,
    setTestForm,
    setTestFormValid
  );

  const liveSecret = useMemo(() => {
    return converToAsterik(apiKeys?.live_keys.secret);
  }, [apiKeys]);

  const testSecret = useMemo(() => {
    return converToAsterik(apiKeys?.test_keys.secret);
  }, [apiKeys]);

  return (
    <div className="general">
      <div>
        <h3 className="title title-black">API Configuration - Live Mode </h3>
        <form className="settingsform">
          <div className="settingsform-group ">
            <label className="title title-grey">Live Secret key</label>
            <ActionLabel
              text={liveShow ? apiKeys?.live_keys.secret : liveSecret}
              onclick={() => setLiveShow(!liveShow)}
            >
              <View />
            </ActionLabel>
          </div>
          <div className="settingsform-group">
            <label className="title title-grey">Live Public Key</label>
            <ActionLabel
              text={apiKeys?.live_keys.public_key}
              onclick={() => handleCopy(apiKeys?.live_keys.public_key)}
            >
              <Copy fill="#909198" />
            </ActionLabel>
          </div>
          {liveform}
          {/* <Button bg={"button_primary"}>Save Changes</Button> */}
        </form>
      </div>
      <div className="mt-bg">
        <h3 className="title title-black">API Configuration - Test Mode </h3>
        <form className="settingsform">
          <div className="settingsform-group ">
            <label className="title title-grey">Test Secret key</label>
            <ActionLabel
              text={testShow ? apiKeys?.test_keys.secret : testSecret}
              onclick={() => setTestShow(!testShow)}
            >
              <View />
            </ActionLabel>
          </div>
          <div className="settingsform-group ">
            <label className="title title-grey">Test Public Key</label>
            <ActionLabel
              text={apiKeys?.test_keys.public_key}
              onclick={() => handleCopy(apiKeys?.live_keys.public_key)}
            >
              <Copy fill="#909198" />
            </ActionLabel>
          </div>
          {testform}
          {/* <Button bg={"button_primary"}>Save Changes</Button> */}
        </form>
      </div>
    </div>
  );
};

export default Webhooks;
