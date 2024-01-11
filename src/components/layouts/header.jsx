import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoSmall from "../icons/logoSmall";
import { ReactComponent as ProfileSVG } from "../icons/profile.svg";
import { ReactComponent as Market } from "../icons/market.svg";
import searchIco from "../icons/Search.svg";
import logoLogin from "../icons/logoForLogin.svg";
import phone from "../icons/phone.svg";
import email from "../icons/email.svg";
import burgerC from "../icons/burgCatal.svg";
import { UseBasket } from "../../context/BasketContext";
import { UseEnterShow } from "../../context/EnterContext";
import CatalogSidebar from "../CatalogBlock/CatalogSidebar";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
  const { setLoginWithPhone, setLoginWithEmail } = UseEnterShow();
  const [searchResults, setSearchResults] = useState([]);
  const [loginModal, setLoginModal] = useState("");
  const location = useLocation();
  const [isShowSidebar, setIsShowSideBar] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);

  console.log(cart)

  function setShow() {
    setIsShowSideBar(!isShowSidebar);
  }

  const OpenLoginWithPhone = () => {
    location.pathname = "/login";
    setLoginWithPhone(true);
    setLoginWithEmail(false);
  };
  const OpenLoginWithEmail = () => {
    location.pathname = "/login";
    setLoginWithEmail(true);
    setLoginWithPhone(false);
  };

  useEffect(() => {
    setSearchResults([1, 2]);
  }, []);

  const handleLoginClick = () => {
    setLoginModal(!loginModal);
  };
  const handleCloseModal = () => {
    setLoginModal(false);
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <div className={"header-background" + (isHomePage ? " homeH" : "")}>
        <div className="header container  header-pos">
          <div className="header-left">
            <div className="header-logo">
              <Link to="/home">
                <LogoSmall />
              </Link>
            </div>
            <Link to="/catalog" className="header-right_catalog">
              {/* <CatalogIcon /> */}
              <img src={burgerC} alt="burger" />
              Каталог
            </Link>
          </div>

          <div className="header-search">
            <img src={searchIco} alt="search" />
            <input type="text" placeholder="Поиск" />
            <p className="header-search_search-result">
              {searchResults.length} Товаров
            </p>
          </div>

          <div className="header-right">
            <div className="header-left_login">
              <div
                className="header-left_block-text"
                onClick={handleLoginClick}
              >
                <p>Добро пожаловать</p>
                <span>Вход/Регистирация</span>
              </div>
              <Link to="my-account">
                <ProfileSVG />
              </Link>
            </div>
            <div
              className={`header-left_login-modal ${loginModal ? "open" : ""}`}
            >
              <button
                className="close-button"
                onClick={handleCloseModal}
              ></button>
              <img src={logoLogin} alt="logo" />
              <p>
                Создай свой стиль с нашей мебелью — где комфорт встречает
                элегантность!
              </p>
              <strong>Войдите или зарегистрируйтесь через</strong>
              <div className="login-modal-link">
                <a href="#" onClick={OpenLoginWithPhone}>
                  <img src={phone} alt="phone-ico" />
                  Номер телефона
                </a>
                <a href="#" onClick={OpenLoginWithEmail}>
                  <img src={email} alt="email-ico" />
                  Email
                </a>
              </div>
            </div>
            <div className="header-right_market">
              <Link to="/basket">
                <Market />
              </Link>
              <span className="market-count">
                {cart.length}
              </span>
            </div>
          </div>
          <div
            className="header-burger"
            onClick={() => {
              setShow();
            }}
          >
            <span className="header-burger_line"></span>
          </div>
        </div>
      </div>

      {isShowSidebar ? (
        <CatalogSidebar display={isShowSidebar} setShow={setShow} />
      ) : null}
    </>
  );
};

export default Header;
