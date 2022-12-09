import React from 'react';
import './Hero.css';
import Button from '../Button/Button';

function Hero({ title, btnTitle }) {
  return (
    <div className='hero'>
      <h1 className='title'>{title}</h1>
      <Button>{btnTitle}</Button>
    </div>
  );
}
export default Hero;
