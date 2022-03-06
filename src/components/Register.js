import React from "react";
import AuthForm from "./AuthForm";

export default function Register({ handleRegister }) {
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
    handleRegister(email, password);
  }

  return (
    <AuthForm
      title={"Регистрация"}
      buttonText={"Зарегестрироваться"}
      formName={"formRegi"}
      handleSubmit={handleSubmit}
    >
      <input
        onChange={onChangeInputEmail}
        form="formRegi"
        type="email"
        className="auth-form__input auth-form__input_email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        onChange={onChangeInputPassword}
        form="formRegi"
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
