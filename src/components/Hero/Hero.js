import React from 'react';
import './Hero.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function Hero({ title, btnTitle }) {
  return (
    <div className='hero'>
      <h1 className='title'>{title}</h1>
      <Link to='/login'>
        <Button>{btnTitle}</Button>
      </Link>
    </div>
  );
}
export default Hero;
