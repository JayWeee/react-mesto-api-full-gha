import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `card__btn card__btn_action_like ${isLiked && 'card__btn_action_like-active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="card__image"
      />
      {isOwn && (
        <button
          className="card__btn card__btn_action_remove"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
