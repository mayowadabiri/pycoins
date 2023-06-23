import { toast } from "react-toastify";
async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

const handleCopy = async (text) => {
  await copyTextToClipboard(text);
  toast.success("Copied");
};

export default handleCopy;
