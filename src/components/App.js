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
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditPopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isAddPopupOpen, setAddPopupOpen] = React.useState(false);
  const [isAlertPopup, setAlertPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isTooltipStatus, setTooltipStatus] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setUserCards] = React.useState([]);
  const [email, setEmail] = React.useState(null);

  const history = useHistory();

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
    handleCheckToken();
    if (loggedIn) {
      history.push("/main");
      Promise.all([api.getUserProfile(), api.getUserCards()])
        .then(([userData, userCard]) => {
          setCurrentUser(userData);
          setUserCards(userCard);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

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

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        setEmail(email);
        localStorage.setItem("jwt", data.token);
        handleCheckToken();
      })
      .catch((err) => {
        console.log(err);
        setTooltipStatus(false);
        handleAlertPopup();
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({});
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setTooltipStatus(true);
        handleAlertPopup();
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setTooltipStatus(false);
        handleAlertPopup();
      });
  }

  function handleEditProfileClick() {
    setEditPopupOpen(true);
  }

  function handleAvatarProfileClick() {
    setAvatarPopupOpen(true);
  }

  function handleAlertPopup() {
    setAlertPopupOpen(true);
  }

  function handleAddProfileClick() {
    setAddPopupOpen(true);
  }

  function handleImageClick(item) {
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setTooltipStatus();
    setAvatarPopupOpen(false);
    setAddPopupOpen(false);
    setAlertPopupOpen(false);
    setEditPopupOpen(false);
    setSelectedCard({});
  }

  function closeOverlayPopup(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt")) {
      // проверяем токен пользователя

      auth.checkToken(jwt).then((user) => {
        setLoggedIn(true);
        setEmail(user.data.email);
      });
    }
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={handleLogOut} />

      <Switch>
        <ProtectedRoute
          path="/main"
          component={Main}
          loggedIn={loggedIn}
          handleEditProfileClick={handleEditProfileClick}
          handleAddProfileClick={handleAddProfileClick}
          handleAvatarProfileClick={handleAvatarProfileClick}
          handleImageClick={handleImageClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardRemove={handleCardRemove}
        />
        <Route path="/signin">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <Register handleRegister={handleRegister} />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <InfoTooltip
        isOpen={isAlertPopup}
        status={isTooltipStatus}
        onClose={closeAllPopups}
        handleClickClose={closeOverlayPopup}
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
