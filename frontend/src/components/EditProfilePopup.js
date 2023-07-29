import { useEffect, useContext } from 'react';
import { useForms } from '../hooks/useForms';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';

function EditProfilePopup({ onUpdateUser, isOpen }) {

  const { values, handleChange, setValues } = useForms({});

  const currentUser = useContext(CurrentUserContext);
  const { isLoading } = useContext(AppContext);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    }); // eslint-disable-next-line
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        className="popup__input"
        name="name"
        value={values.name || ''}
        id="name-input"
        type="text"
        required
        placeholder="Имя профиля"
        onChange={handleChange}
      />

      <span className="popup__input-error name-input-error" />

      <input
        className="popup__input"
        name="about"
        value={values.about || ''}
        id="about-input"
        type="text"
        required
        placeholder="Статус"
        onChange={handleChange}
      />

      <span className="popup__input-error about-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
