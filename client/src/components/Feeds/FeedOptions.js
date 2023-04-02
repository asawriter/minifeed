import { useState } from "react";

const FeedOptions = ({ setShowOptions }) => {
  const path = window.location.href;
  const [showText, setShowText] = useState(false)

  const copyClipboard = () => {
    navigator.clipboard.writeText(path)
    setShowText(true);
  }

  const handleTimeout = () => {
    setTimeout(() => {
      setShowOptions(false);
      setShowText(false);
    }, 2000)
  }

  return (
    <div className="feedOptions" onClick={handleTimeout}>
      <li onClick={copyClipboard}>Copy link</li>
      {showText && <li style={{backgroundColor : "lightgray"}}>Copied to Clipboard</li>}
      <li>Remove feed</li>
      <li>Share to Instagram</li>
    </div>
  );
};

export default FeedOptions;
