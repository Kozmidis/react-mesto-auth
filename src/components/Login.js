import React from "react";
import AuthForm from "./AuthForm";

export default function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function onChangeInputEmail(e) {
    setEmail(e.target.value);
  }

  function onChangeInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <AuthForm
      title={"Вход"}
      buttonText={"Войти"}
      formName={"formLogin"}
      handleSubmit={handleSubmit}
    >
      <input
        onChange={onChangeInputEmail}
        form="formLogin"
        type="email"
        className="auth-form__input auth-form__input_email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        onChange={onChangeInputPassword}
        form="formLogin"
        type="password"
        className="auth-form__input auth-form__input_password"
        id="password"
        name="password"
        placeholder="Пароль"
        required
      />
    </AuthForm>
  );
}
