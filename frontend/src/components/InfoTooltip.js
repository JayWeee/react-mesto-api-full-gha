import React, { useContext } from 'react';
import success from '../images/success.svg';
import failure from '../images/failure.svg';
import { AppContext } from '../contexts/AppContext';

function InfoTooltip({ isOpen, regStatusInfo }) {

  const { closeAllPopups } = useContext(AppContext);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={closeAllPopups}
          className="popup__btn popup__btn_action_close"
          type="button"
        />
        <div className="popup__info-tooltip-container">
          <img
            className="popup__info-tooltip-image"
            src={regStatusInfo ? success : failure}
            alt="Статус регистрации"
          />
          <p className="popup__info-tooltip-caption">
            {regStatusInfo
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
