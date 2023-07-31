import React, { useState } from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import logo from '../images/logo.svg';
import { removeCoockies } from '../utils/auth'

function Header({ userData }) {

  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);

  function handleBurgerMenuClick () {
    setIsBurgerMenuActive(!isBurgerMenuActive);
  }

  function signOut() {
    localStorage.removeItem('userId');
    removeCoockies()
  }

  return (
    <header className="header header_mobile">
      <img src={logo} alt="Логотип" className="logo" />
      <Routes>
        <Route path='/' element={
          <>
            <div className='burger-menu' onClick={handleBurgerMenuClick}>
              <span className={`${isBurgerMenuActive ? 'burger-menu__line burger-menu__line_active' : 'burger-menu__line'}`} />
              <span className={`${isBurgerMenuActive ? 'burger-menu__line burger-menu__line_active' : 'burger-menu__line'}`} />
              <span className={`${isBurgerMenuActive ? 'burger-menu__line burger-menu__line_active' : 'burger-menu__line'}`} />
            </div>

            <div className={`${isBurgerMenuActive ? 'header__user-info-container' : 'header__user-info-container header__user-info-container_hidden'}`}>
              <p className='header__user-email'>{userData.email}</p>
              <Link className='header__out-link' to='/sign-in' onClick={signOut}>Выйи</Link>
            </div>
          </>
        } /> 
        <Route path='/sign-in' element={<Link className='header__link' to='/sign-up'>Регистрация</Link>} />
        <Route path='/sign-up' element={<Link className='header__link' to='/sign-in'>Войти</Link>} />
      </Routes>
    </header>
  );
}

export default Header;
