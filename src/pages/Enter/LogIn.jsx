import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseEnterShow } from '../../context/EnterContext';
import { ReactComponent as Logo } from '../../components/icons/Group.svg';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import EmailInput from '../../components/EmailInput/EmailInput';
import PhoneInput from 'react-phone-number-input';
import Register from './Register';
import 'react-phone-number-input/style.css';
import 'react-phone-number-input/style.css';
import './Enter.scss';
import { Toast } from 'primereact/toast';
import { loginClientEmail, loginClientPhone } from '../../services/api';

const LogIn = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const {
    loginWithPhone,
    loginWithEmail,
    register,
    setLoginWithPhone,
    setLoginWithEmail,
    setRegister,
  } = UseEnterShow();
  const ShowRegister = () => {
    setLoginWithPhone(false);
    setLoginWithEmail(false);
    setRegister(true);
  };
  const [password, setPassword] = useState('');
  const [userDataPhone, setUserDataPhone] = useState(null);
  const [userDataEmail, setUserDataEmail] = useState(null);

  const showToast = (msg) => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: msg });
  };
  const handleChangeUser = (e) => {
    if (loginWithEmail) {
      setUserDataEmail(e.target.value); return
    }
    setUserDataPhone(e);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const isVariable = () => {
    if (!password) return false
    return (loginWithEmail && userDataEmail) || (loginWithPhone && userDataPhone)
  };
  const close = (path) => {
    setLoginWithPhone(false);
    setLoginWithEmail(false);
    navigate(path, { replace: true });
  }

  const ClickEnterBtn = () => {
    if (loginWithPhone) {
      loginClientPhone({ phone: userDataPhone, password })
        .then(res => close('/my-account'))
        .catch(err => {
          showToast(err?.response?.data?.msg)
          console.log(err)
        })
      return
    }
    loginClientEmail({ email: userDataEmail, password })
      .then(res => close('/my-account'))
      .catch(err => showToast(err?.response?.data?.msg))
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loginWithPhone, loginWithEmail]);

  return register ? (
    <Register />
  ) : (
    <div className='wrapper'>
      <div className='login-container'>
        <div className='container'>
          <h1 onClick={() => close('/home')} className='headline'>
            <Logo />
          </h1>
          <div className='line'></div>
          <div className='description'>
            <h2 className='desc'>Вход</h2>
            <p className='desc-sec'>Введите свои данные, чтобы войти</p>
          </div>

          <form>
            {loginWithEmail && <EmailInput handleChange={handleChangeUser} />}
            {loginWithPhone && (
              <div className='input'>
                <label htmlFor='phoneNumber' className='label'>
                  Номер телефона
                </label>
                <PhoneInput
                  id='phoneNumber'
                  name='phoneNumber'
                  defaultCountry='KG'
                  displayInitialValueAsLocalNumber
                  withCountryCallingCode
                  initialValueFormat='national'
                  onChange={handleChangeUser}
                />
              </div>
            )}

            <PasswordInput handleChange={handleChangePassword} />

            <div className='bottom-form'>
              <div className='remember'>
                <input type='checkbox' id={'checkbox'} />
                <label htmlFor='checkbox'>Запомнить меня</label>
              </div>
              <button type='button'
                className={!isVariable() ? 'disabled' : 'button'}
                disabled={!isVariable()}
                onClick={ClickEnterBtn}
              >
                Войти
              </button>
            </div>
          </form>

          <p className='registration-link' onClick={ShowRegister}>
            Новый пользователь? <a href='#'>Зарегистрироваться</a>
          </p>
        </div>
        <Toast ref={toast} />
      </div>
    </div>
  );
};

export default LogIn;
