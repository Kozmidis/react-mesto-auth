export default function ImagePopup({ card, onClose, handleClickClose }) {
  return (
    <div
      onClick={handleClickClose}
      className={`popup popup_image ${card.link ? "popup_opened" : ""}`}
      id="popup__image"
    >
      <div className="popup__image-container popup__content">
        <img src={card.link} alt={card.name} className="popup__image" />
        <h2 className="popup__image-name">{card.name}</h2>
        <button
          onClick={onClose}
          type="button"
          className="popup__close popup__close_img"
        ></button>
      </div>
    </div>
  );
}
