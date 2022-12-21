import React, { useCallback, useState } from 'react';

import Button from '../Button/Button';
import show from '../../images/Rectangle 15.png';

import './Login.css';

const LOGIN_TOKEN_API = 'https://dummy-video-api.onrender.com/auth/login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authKey, setAutKey] = useState('');
  const [badLogin, setBadLogin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approvedLogin, setApprovedLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handlePassowrd = (e) => {
    setPassword(e.target.value);
  };

  const toggleLogin = () => {
    const loginData = { username, password };

    getToken(loginData);
  };

  const getToken = useCallback(async (data) => {
    setLoading(true);
    try {
      const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(LOGIN_TOKEN_API, requestOption);
      if (!response.ok) {
        setBadLogin(true);
      } else {
        setBadLogin(false);

        const loginToken = await response.json();

        setAutKey(loginToken);
        setApprovedLogin(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const showPassw = () => {
    setShowPassword(!showPassword);
  };

  if (approvedLogin) {
    window.location.pathname = '/items';
    window.localStorage.setItem('authKey', JSON.stringify(authKey.token));
  }
  return (
    <div className='login'>
      {loading && <p>Loading...</p>}
      {error ? (
        <p>Whoops! 😱🏴‍☠️☁️</p>
      ) : (
        <div className='login__info'>
          <form>
            <div className='login__info__data'>
              <label>Username</label>
              <input
                placeholder='Enter Username'
                ype='text'
                onChange={(e) => handleName(e)}
              />
            </div>
            <div className='login__info__data'>
              <label>Passowrd</label>
              <span
                onClick={() => showPassw()}
                className={badLogin ? 'icon iconWithErr' : 'icon'}
              >
                <img alt='showPassword' src={show} />
              </span>
              <input
                placeholder='Enter Passowrd'
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => handlePassowrd(e)}
              />
            </div>
            <div className='login__info__error'>
              <p id='error'>
                {badLogin ? 'Failure: Please check the login details' : ''}
              </p>
            </div>
            <div className='login__info__btn'>
              <Button onClick={() => toggleLogin()} size='small'>
                Sign In
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
