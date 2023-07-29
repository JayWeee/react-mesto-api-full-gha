import { useForms } from '../hooks/useForms';
import SignForm from './SignForm';

function Login({ handleLogin }) {

  const { values, handleChange } = useForms({});

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values);
  }

  return (
    <SignForm
      name="login"
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
    >
      <input
        className="sign-form__input"
        type="email"
        name="email"
        placeholder="Email"
        required
        value={values.email || ''}
        onChange={handleChange}
      />
      <input
        className="sign-form__input"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        value={values.password || ''}
        onChange={handleChange}
      />
    </SignForm>
  );
}

export default Login;
