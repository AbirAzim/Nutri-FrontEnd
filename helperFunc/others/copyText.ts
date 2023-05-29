const copyText = (text) => {
  // clipboardData Copy what you need on the page to the clipboard
  //@ts-ignore
  const clipboardData = window.clipboardData;
  if (clipboardData) {
    clipboardData.clearData();
    clipboardData.setData("Text", text);
    return true;
  } else if (document.execCommand) {
    // Note that document.execCommand is deprecated but some browsers still support it. Remember to check the compatibility when using it
    // Get the content to be copied by creating a dom element
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    // Copy the current content to the clipboard
    document.execCommand("copy");
    // delete el node
    document.body.removeChild(el);
    return true;
  }
  return false;
};
// copyText("hello!"); // ctrl + v = copyText  | true

export default copyText;
