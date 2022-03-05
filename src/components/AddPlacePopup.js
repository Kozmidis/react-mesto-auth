import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  handleClickClose,
  onAddPlace,
}) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function onChangeInputName(e) {
    setName(e.target.value);
  }

  function onChangeInputLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"popup__add"}
      title={"Новое место"}
      buttonText={"Создать"}
      onClose={onClose}
      handleClickClose={handleClickClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={onChangeInputName}
        value={name || ""}
        id="place"
        form="formAdd"
        type="text"
        className="popup__form-input popup__form-input_input_place"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__form-input-error place-error"></span>
      <input
        onChange={onChangeInputLink}
        value={link || ""}
        type="url"
        id="image"
        form="formAdd"
        className="popup__form-input popup__form-input_input_image"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__form-input-error image-error"></span>
    </PopupWithForm>
  );
}
