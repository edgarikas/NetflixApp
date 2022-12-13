import Button from '../Button/Button';
import logo from '../../images/F.png';
import { Link, Outlet } from 'react-router-dom';

import './Header.css';

function Header({ children }) {
  return (
    <header className='Header'>
      <div className='Header__container'>{children}</div>
    </header>
  );
}

export default Header;
