import Button from '../Button/Button';
import logo from '../../images/F.png';

import './Header.css';

function Header({ children }) {
  return (
    <header className='Header'>
      <div className='Header__container'>
        <img className='Header__logo' design='outline' src={logo} alt='logo' />
        <Button>Login</Button>
      </div>
    </header>
  );
}

export default Header;
