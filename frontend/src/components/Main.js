import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-container">
            <span
              onClick={props.onEditAvatar}
              className="profile__avatar-edit"
            />
            <img
              className="profile__avatar"
              alt="Фото профиля"
              src={currentUser.avatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                className="profile__btn profile__btn_action_edit"
                type="button"
              />
            </div>
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__btn profile__btn_action_add"
          type="button"
        />
      </section>
      <section className="photo-grid" aria-label="Карточки">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
