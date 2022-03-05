import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  handleClickClose,
  onUpdateAvatar,
}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"popup__avatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      onClose={onClose}
      handleClickClose={handleClickClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        id="avatar"
        form="formAvatar"
        className="popup__form-input popup__form-input_input_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__form-input-error avatar-error"></span>
    </PopupWithForm>
  );
}
