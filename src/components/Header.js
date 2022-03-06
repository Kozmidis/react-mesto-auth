import logo from "../images/logo.svg";
import { Route, Link } from "react-router-dom";

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <a href="#" target="_self">
        <img src={logo} alt="Лого" className="header__logo" />
      </a>
      <div className="header__container">
        <Route exact path="/main">
          <p className="header__email">{email}</p>
          <Link to={"/signin"} className="header__link" onClick={onSignOut}>
            Выйти
          </Link>
        </Route>
        <Route exact path={"/signin"}>
          <Link className="header__link" to={"/signup"}>
            Регистрация
          </Link>
        </Route>
        <Route exact path={"/signup"}>
          <Link className="header__link" to={"/signin"}>
            Войти
          </Link>
        </Route>
      </div>
    </header>
  );
}
