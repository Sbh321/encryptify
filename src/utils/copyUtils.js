export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:");
    } else {
      // Fallback for older browsers or environments where Clipboard API is not available
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log("Text copied to clipboard:");
    }
  } catch (err) {
    console.error("Failed to copy text to clipboard:", err);
  }
};
