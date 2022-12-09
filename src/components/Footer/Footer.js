import creditCardsImg from '../../images/payments.jpg';
import './Footer.css';

function Footer() {
  return (
    <footer className='Footer'>
      <div className='Footer__container'>
        <p>Copyright © 2019-2022 felix.com</p>
        <img src={creditCardsImg} alt='credit card icons' />
      </div>
    </footer>
  );
}

export default Footer;
