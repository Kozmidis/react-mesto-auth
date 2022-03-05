import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  handleClickClose,
  onUpdateUser,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, onClose]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  function onChangeInputName(e) {
    setName(e.target.value);
  }

  function onChangeInputDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"popup__edit"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      onClose={onClose}
      handleClickClose={handleClickClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={onChangeInputName}
        value={name || ""}
        id="user"
        form="formEdit"
        type="text"
        className="popup__form-input popup__form-input_input_name"
        name="name"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__form-input-error user-error" />
      <input
        onChange={onChangeInputDescription}
        value={description || ""}
        id="userjob"
        form="formEdit"
        type="text"
        className="popup__form-input popup__form-input_input_job"
        name="about"
        placeholder="Расскажите о себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__form-input-error userjob-error" />
    </PopupWithForm>
  );
}
