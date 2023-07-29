import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function PopupWithForm({ isOpen, onSubmit, name, title, children, buttonText }) {

  const { closeAllPopups } = useContext(AppContext);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={closeAllPopups}
          className="popup__btn popup__btn_action_close"
          type="button"
        />
        <form
          className="popup__form"
          onSubmit={onSubmit}
          action="#"
          name={name}
          id={name}
        >
          <h2 className="popup__header">{title}</h2>
          {children}
          <button type="submit" className="popup__btn popup__btn_action_submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
