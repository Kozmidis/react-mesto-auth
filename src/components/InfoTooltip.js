import successImage from "../images/sucsses.svg";
import failImage from "../images/error.svg";

export default function InfoTooltip({
  isOpen,
  isRegister,
  handleClickClose,
  onClose,
}) {
  return (
    <div
      className={`popup  ${isOpen ? "popup_opened" : ""}`}
      onClick={handleClickClose}
    >
      <div className="popup__container popup__alert">
        <img
          className="popup__alert-image"
          src={isRegister ? successImage : failImage}
        />
        <div>
          {isRegister ? (
            <p className="popup__form-title">Вы успешно зарегистрировались!</p>
          ) : (
            <p className="popup__form-title">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          )}
        </div>

        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
