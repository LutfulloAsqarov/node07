import React from "react";
import "./Model.scss";

const Modal = ({ children, close, width = 400, sty }) => {
  return (
    <>
      <div
        style={{ backgroundColor: sty }}
        onClick={() => close(false)}
        className="overlay"
      ></div>
      <div style={{ width }} className="modal">
        {children}
      </div>
    </>
  );
};

export default Modal;
