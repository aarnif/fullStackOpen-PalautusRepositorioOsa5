import React, { useState } from "react";

const Togglable = ({ buttonLabel, children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleIsVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <div style={{ display: isVisible ? "" : "none" }}>{children}</div>
      <button onClick={toggleIsVisible}>
        {isVisible ? "cancel" : buttonLabel}
      </button>
    </>
  );
};

export default Togglable;
