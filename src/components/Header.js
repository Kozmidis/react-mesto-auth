import logo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <a href="#" target="_self">
        <img src={logo} alt="Лого" className="header__logo" />
      </a>
    </header>
  );
}
