import React from "react";
import { Route, Link } from "react-router-dom";

export default function AuthForm({
  title,
  children,
  buttonText,
  formName,
  handleSubmit,
}) {
  return (
    <div className="auth-form">
      <form
        onSubmit={handleSubmit}
        className="auth-form__form"
        name={formName}
        noValidate
      >
        <div className="auth-form__container">
          <h2 className="auth-form__title">{title}</h2>
          {children}
        </div>
        <button type="submit" className="auth-form__button">
          {buttonText}
        </button>
      </form>
      <Route path={"/signup"}>
        <p className="login-link">
          Уже зарегистрированы?
          <Link to="/signin" className="login-link login-link__span">
            Войти
          </Link>
        </p>
      </Route>
    </div>
  );
}
