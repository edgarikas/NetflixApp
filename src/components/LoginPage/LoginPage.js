import React from 'react';

import Button from '../Button/Button';
import show from '../../images/Rectangle 15.png';

import './Login.css';

const LOGIN_TOKEN_API = 'https://dummy-video-api.onrender.com/auth/login';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    loginInfo: {},
    token: '',
    badLogin: false,
    error: false,
    loading: false,
    approvedLogin: false,
    showPassword: false,
  };

  handleName = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassowrd = (e) => {
    this.setState({ password: e.target.value });
  };

  toggleLogin = () => {
    const { username, password } = this.state;
    const loginData = { username, password };
    this.setState({ loginInfo: loginData });
    this.getToken(loginData);
  };

  async getToken(data) {
    try {
      const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(LOGIN_TOKEN_API, requestOption);
      if (!response.ok) {
        this.setState({ badLogin: true });
      } else {
        this.setState({ badLogin: false });
        const loginToken = await response.json();

        this.setState({ token: loginToken });
        this.setState({ approvedLogin: true });
      }
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  showPassw = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  render() {
    const { badLogin, error, loading, approvedLogin, token, showPassword } =
      this.state;

    if (approvedLogin) {
      window.location.pathname = '/items';
      window.localStorage.setItem('authKey', JSON.stringify(token.token));
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
                  onChange={this.handleName}
                />
              </div>
              <div className='login__info__data'>
                <label>Passowrd</label>
                <span
                  onClick={() => this.showPassw()}
                  className={badLogin ? 'icon iconWithErr' : 'icon'}
                >
                  <img src={show} />
                </span>
                <input
                  placeholder='Enter Passowrd'
                  type={showPassword ? 'text' : 'password'}
                  onChange={this.handlePassowrd}
                />
              </div>
              <div className='login__info__error'>
                <p id='error'>
                  {badLogin ? 'Failure: Please check the login details' : ''}
                </p>
              </div>
              <div className='login__info__btn'>
                <Button onClick={this.toggleLogin} size='small'>
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
<Button size='small'>Sign In</Button>;
