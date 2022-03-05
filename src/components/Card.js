import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card,
  handleImageClick,
  handleCardLike,
  handleCardRemove,
}) {
  const currentUserCard = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUserCard._id;

  const isLiked = card.likes.some((i) => i._id === currentUserCard._id);

  const cardLikeButtonClassName = `photos__card-like ${
    isLiked ? "photos__card-like_active" : ""
  }`;

  function handleCard() {
    handleImageClick(card);
  }
  function onCardRemove() {
    handleCardRemove(card._id);
  }

  function onCardLike() {
    handleCardLike(card);
  }

  return (
    <div className="photos__card">
      <img
        src={card.link}
        alt={card.name}
        className="photos__card-image"
        onClick={handleCard}
      />
      <div className="photos__info">
        <h2 className="photos__card-name">{card.name}</h2>
        <div className="photos__likebar">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={onCardLike}
          />
          <p className="photos__card-like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          onClick={onCardRemove}
          type="button"
          className="photos__remove-button photos__remove-button_active"
        />
      )}
    </div>
  );
}
