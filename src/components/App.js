import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditPopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isAddPopupOpen, setAddPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setUserCards] = React.useState([]);

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setUserCards([newCard, ...cards]);
        if (newCard) {
          closeAllPopups();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    Promise.all([api.getUserProfile(), api.getUserCards()])
      .then(([userData, userCard]) => {
        setCurrentUser(userData);
        setUserCards(userCard);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((item) => {
        setUserCards((state) =>
          state.map((c) => (c._id === card._id ? item : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardRemove(cardId) {
    api
      .removeCard(cardId)
      .then(() => {
        setUserCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserProfile(data)
      .then((userData) => {
        setCurrentUser(userData);
        if (userData) {
          closeAllPopups();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        if (avatarData) {
          closeAllPopups();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditProfileClick() {
    setEditPopupOpen(true);
  }

  function handleAvatarProfileClick() {
    setAvatarPopupOpen(true);
  }

  function handleAddProfileClick() {
    setAddPopupOpen(true);
  }

  function handleImageClick(item) {
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setAddPopupOpen(false);
    setEditPopupOpen(false);
    setSelectedCard({});
  }

  function closeOverlayPopup(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        handleEditProfileClick={handleEditProfileClick}
        handleAddProfileClick={handleAddProfileClick}
        handleAvatarProfileClick={handleAvatarProfileClick}
        handleImageClick={handleImageClick}
        cards={cards}
        handleCardLike={handleCardLike}
        handleCardRemove={handleCardRemove}
      />
      <Footer />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        handleClickClose={closeOverlayPopup}
      />
      <EditAvatarPopup
        isOpen={isAvatarPopupOpen}
        onClose={closeAllPopups}
        handleClickClose={closeOverlayPopup}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditPopupOpen}
        onClose={closeAllPopups}
        handleClickClose={closeOverlayPopup}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPopupOpen}
        onClose={closeAllPopups}
        handleClickClose={closeOverlayPopup}
        onAddPlace={handleAddPlaceSubmit}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
