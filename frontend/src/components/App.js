import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ state: false, card: {} });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '', _id: '' });
  const [regStatusInfo, setRegStatusInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isInfoTooltipOpen ||
    selectedCard.state;

  useEffect(() => {
    function closeByEsc(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEsc);
      return () => {
        document.removeEventListener('keydown', closeByEsc);
      };
    }// eslint-disable-next-line
  }, [isOpen]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ state: true, card: card });
  }

  function handleSubmit(request) {
    setIsLoading(true);

    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({ name, about }) {
    function makeRequest() {
      return api.setUserInfo({ name, about }).then(setCurrentUser);
    }

    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ link }) {
    function makeRequest() {
      return api.setUserAvatar({ link }).then(setCurrentUser);
    }

    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit({ title: name, link }) {
    function makeRequest() {
      return api
        .setNewCard({ name, link })
        .then((newCard) => setCards([newCard, ...cards]));
    }

    handleSubmit(makeRequest);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ state: false, card: selectedCard.card });
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(cards)
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  function handleRegister({ password, email }) {
    auth
      .register({ password, email })
      .then(() => {
        setRegStatusInfo(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setRegStatusInfo(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin({ password, email }) {
    auth
      .authorize({ password, email })
      .then((data) => {
        if (data.userId) {
          localStorage.setItem('userId', data.userId);
          setLoggedIn(true);
          tokenCheck();
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setRegStatusInfo(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function tokenCheck() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      auth
        .getContent(userId)
        .then((data) => {
          setUserData({ email: data.email, _id: data._id });
          setLoggedIn(true);

          Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cards]) => {
              setCurrentUser(userData);
              setCards(cards);
            })
            .catch((err) => console.log(err));

          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    tokenCheck(); // eslint-disable-next-line
  }, []);

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header pathname={pathname} userData={userData} />

          <Routes>
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/sign-up"
              element={
                <Register pathname={pathname} handleRegister={handleRegister} />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  element={Main}
                  loggedIn={loggedIn}
                />
              }
            />
          </Routes>

          <Footer />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            regStatusInfo={regStatusInfo}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm name="confirm-delite" title="Вы уверены?" />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
