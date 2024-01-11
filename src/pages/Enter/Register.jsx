import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconLogo } from '../../components/icons/Group.svg';
import { ReactComponent as IconUser } from '../../components/icons/User.svg';
import { ReactComponent as IconLocation } from '../../components/icons/Location-i.svg';
import { UseEnterShow } from '../../context/EnterContext';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import EmailInput from '../../components/EmailInput/EmailInput';
import PhoneInput from 'react-phone-number-input';
import Verification from '../../components/UI/Verification/Verification';
import { registerByEmail, verifyClients } from '../../services/api';
import './Enter.scss';

const Register = () => {
  const { setLoginWithPhone, register, setRegister } = UseEnterShow();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [verify, setVerify] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: null,
    location: '',
    email: '',
    password: '',
  });
  // verify
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCodeSubmit = async (code) => {
    if (isLoading) return;
    verifyClients({phone: userData.phone, code: code})
    .then(res => {
      showToast(res?.data?.msg);
      setVerifySuccess(true)
    })
    .catch(err => {
      showToast(err.response?.data?.msg || err.response?.data?.error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };
  // verify

  const showToast = (msg) => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: msg });
  };
  const GoLogin = () => {
    setRegister(false);
    setLoginWithPhone(true);
  };
  const handleGoHome =() => {
    setRegister(false);
    setLoginWithPhone(false);
    navigate('/home')
  }
  const handleChange = (e, type) => {
    if (type === 'phone') {
      setUserData({ ...userData, [type]: e }); return
    }
    const { value } = e.target;
    setUserData({ ...userData, [type]: value })
  };

  const isVariable = () => {
    const { name, phone, location, email, password } = userData
    return (name && phone && location && email && password)
  };

  // Verifying
  const ClickEnterBtn = () => {
    registerByEmail(userData)
      .then(res => {
        console.log(res);
        showToast(res?.data?.msg)
        setVerify(true)
      })
      .catch(({ response }) => {
        showToast(response?.data?.msg || response?.data?.error);
        const { errors } = response?.data
        errors?.phone &&
          showToast(errors?.phone);
        errors?.name &&
          showToast(errors?.name);
        errors?.email &&
          showToast(errors?.email);
        errors?.password &&
          showToast(errors?.password);
      })
  };
  const ClickEnterBtnAfterVerify = () => {
    setRegister(false);
    navigate('/my-account', { replace: true });
    setVerify(false);
  };


  return (
    register && (
      <div className='wrapper'>
        <Toast ref={toast} />
        <div className='register-container'>
          {!verify ? (
            <div className='container-register'>
              <h1 onClick={handleGoHome} className='headline'>
                <IconLogo />
              </h1>
              <div className='line'></div>
              <div className='description'>
                <h2 className='desc'>Регистрация</h2>
                <p className='desc-sec'>
                  Введите свои данные, чтобы зарегистрироваться
                </p>
              </div>
              <form >

                <div className='input'>
                  <label htmlFor='name' className='label'>
                    ФИО
                  </label>
                  <IconUser />
                  <input id='name' name='name' type='text'
                    placeholder='Ваше ФИО'
                    onChange={(e) => handleChange(e, 'name')}
                  />
                </div>

                <div className='input'>
                  <label htmlFor='phone' className='label'>
                    Номер телефона
                  </label>
                  <PhoneInput
                    id='phone'
                    name='phone'
                    defaultCountry='KG'
                    displayInitialValueAsLocalNumber
                    withCountryCallingCode
                    initialValueFormat='national'
                    value={userData.phone}
                    onChange={(e) => handleChange(e, 'phone')}
                  />
                </div>

                <div className='input'>
                  <label htmlFor='location' className='label'>
                    Город
                  </label>
                  <IconLocation />
                  <input
                    id='location'
                    name='location'
                    type='text'
                    placeholder='Бишкек'
                    onChange={(e) => handleChange(e, 'location')}
                  />
                </div>
                <EmailInput handleChange={handleChange} />
                <PasswordInput
                  handleChange={handleChange}
                  label={'Создайте пароль'}
                  addition={' '}
                />
                <PasswordInput
                  handleChange={handleChange}
                  label={'Повторите пароль'}
                  addition={' '}
                />
                <div className='bottom-form'>
                  <button type='button'
                    className={!isVariable() ? 'disabled' : 'button'}
                    disabled={!isVariable()}
                    onClick={ClickEnterBtn}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </form>
              <p className='registration-link' onClick={GoLogin}>
                Уже есть аккаунт? <a href='#'>Войти</a>
              </p>
            </div>
          ) : (
            <div className='container-register'>
              <h1 className='headline'>
                <IconLogo />
              </h1>
              <div className='line'></div>
              <div className='description'>
                <h2 className='desc'>Код подтверждения</h2>
                <p className='desc-sec'>
                  Для завершения регистрации введите код отправленный на номер
                  {userData.phone}
                </p>
              </div>
              <Verification isLoading={isLoading} callback={handleCodeSubmit} />
              <div className='bottom-form'>
                <button type='button'
                  className={!verifySuccess ? 'disabled' : 'button'}
                  disabled={!verifySuccess}
                  onClick={ClickEnterBtnAfterVerify}
                >
                  Зарегистрироваться
                </button>
              </div>
              <p className='registration-link' onClick={GoLogin}>
                Уже есть аккаунт? <a href='#'>Войти</a>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Register;
