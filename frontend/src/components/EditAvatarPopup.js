import { useRef, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {

  const { isLoading } = useContext(AppContext);

  const inputRef = useRef();
  // Очистка инпута при открытии
  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      link: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="edit-avatar"
      title="Обновить аватар"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        className="popup__input"
        name="link"
        id="link-avatar-input"
        type="url"
        ref={inputRef}
        required
        placeholder="Ссылка на картинку"
      />

      <span className="popup__input-error link-avatar-input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
