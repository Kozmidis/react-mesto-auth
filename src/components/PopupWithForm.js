import React from "react";

export default function PopupWithForm({
  isOpen,
  title,
  name,
  buttonText,
  onClose,
  handleClickClose,
  children,
  onSubmit,
}) {
  return (
    <div
      className={`popup  ${isOpen ? "popup_opened" : ""}`}
      id={name}
      onClick={handleClickClose}
    >
      <div className="popup__container popup__content">
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__form-title">{title}</h2>

          {children}

          <button className="popup__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
