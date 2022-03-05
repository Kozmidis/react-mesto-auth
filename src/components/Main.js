import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  handleEditProfileClick,
  handleAddProfileClick,
  handleAvatarProfileClick,
  handleImageClick,
  cards,
  handleCardLike,
  handleCardRemove,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main">
          <div className="profile__avatar-container">
            <div
              onClick={handleAvatarProfileClick}
              className="profile__avatar-overlay"
            ></div>
            <img
              className="profile__main-avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </div>

          <div className="profile__edit-panel">
            <div className="profile__main-info">
              <h1 className="profile__name">{currentUser.name}</h1>

              <p className="profile__about-me">{currentUser.about}</p>
            </div>
            <button
              onClick={handleEditProfileClick}
              type="button"
              className="profile__redact"
            ></button>
          </div>

          <button
            onClick={handleAddProfileClick}
            type="button"
            className="profile__add-button"
          ></button>
        </div>
      </section>

      <section className="photos">
        <div className="template-photos" id="template-photos">
          <div className="photos__cards">
            {cards.map((item) => (
              <Card
                handleCardLike={handleCardLike}
                key={item._id}
                card={item}
                handleImageClick={handleImageClick}
                handleCardRemove={handleCardRemove}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
