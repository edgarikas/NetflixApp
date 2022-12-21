import cx from 'classnames';
import './Button.css';

function Button({ children, type = 'button', size, design, onClick, id }) {
  const className = cx('Button', {
    'Button--very--small': size === 'very--small',
    'Button--small': size === 'small',
    'Button--outline': design === 'outline',
  });

  // replaced by classnames package cx function
  // const sizeClass = { small: "Button--small" }[size];
  // const designClass = { outline: "Button--outline" }[design];
  // const className = ["Button", sizeClass, designClass].filter(Boolean).join(" ");

  return (
    <button onClick={onClick} type={type} className={className} id={id}>
      {children}
    </button>
  );
}

export default Button;
