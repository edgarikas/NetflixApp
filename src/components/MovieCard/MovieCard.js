import Button from '../Button/Button';
import './MovieCard.css';
import { Link } from 'react-router-dom';

function MovieCard({
  isClickable,
  children,
  title,
  description,
  image,
  onToggleFavorite,
  isFavorite,
  id,
}) {
  return (
    <div className='MovieCard'>
      <div className='MovieCard__image-container'>
        {isClickable ? (
          <Link to={`/items/${id}`}>
            <img
              className='clickable'
              src={image}
              alt={`${title} movie poster`}
            />
          </Link>
        ) : (
          <img src={image} alt={`${title} movie poster`} />
        )}
      </div>
      <div className='MovieCard__content-container'>
        {isClickable ? (
          <Link to={`/items/${id}`}>
            <div className='clickable'>
              <h3 className='MovieCard__title'>{title}</h3>
              <p className='MovieCard__description'>{description}</p>
            </div>
          </Link>
        ) : (
          <div>
            <h3 className='MovieCard__title'>{title}</h3>
            <p className='MovieCard__description'>{description}</p>
          </div>
        )}

        <Button
          onClick={onToggleFavorite}
          size='small'
          design={isFavorite ? 'outline' : null}
        >
          {isFavorite ? 'Remove' : 'Add'}
        </Button>
      </div>
    </div>
  );
}

export default MovieCard;
