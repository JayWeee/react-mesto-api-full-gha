import React, { useState } from 'react';
import SignForm from './SignForm';

function Register({ handleRegister, pathname }) {

  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(formValue)
  }

  return (
    <SignForm
      name="register"
      title="Регистрация"
      buttonText="Зарегестрироваться"
      onSubmit={handleSubmit}
      pathname={pathname}
    >
      <input
        className="sign-form__input"
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        required
        value={formValue.email}
        onChange={handleChange}
      />
      <input
        className="sign-form__input"
        type="password"
        if="password-input"
        name="password"
        placeholder="Пароль"
        required
        value={formValue.password}
        onChange={handleChange}
      />
    </SignForm>
  );
}

export default Register;
