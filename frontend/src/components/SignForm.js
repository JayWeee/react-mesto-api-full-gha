import React from "react";
import { Link } from 'react-router-dom';


function SignForm({ children, pathname, onSubmit, name, title, buttonText }) {
  return(
      <form className="sign-form" name={name} id={name} onSubmit={onSubmit}>
        <h2 className="sign-form__header">{title}</h2>
        {children}
        <button className="sign-form__submit-button" type="submit">{buttonText}</button>
        {pathname === '/sign-up' &&
        <div className="sign-in">
          <Link to='/sign-in' className="sign-in__link">Уже зарегистрированы? Войти</Link>
        </div>
      }
      </form>
  )
}

export default SignForm