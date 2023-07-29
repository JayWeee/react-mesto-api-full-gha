function ImagePopup(props) {
  return (
    <div
      className={`popup popup_opacity ${
        props.card.state ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__image-container">
        <button
          onClick={props.onClose}
          className="popup__btn popup__btn_action_close"
          type="button"
        />
        <img
          src={props.card.card.link}
          alt={props.card.card.name}
          className="popup__photo"
        />
        <p className="popup__caption">{props.card.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
