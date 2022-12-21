import React, { useCallback, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import './MovieDetails.css';
import Button from '../Button/Button';

function MovieDetails({ auth, favoritesMovies, toggleFavorite }) {
  const [movie, setMovie] = useState('');
  const [isDataExist, setIsDataExist] = useState(true);
  const [authKey] = useState(auth);
  const [showTutorial, setShowTutorial] = useState(false);
  const [retries, setRetries] = useState(3);
  const { movieId } = useParams();

  const fetchMovie = useCallback(async () => {
    if (authKey)
      try {
        const response = await fetch(
          `https://dummy-video-api.onrender.com/content/items/${movieId}`
        );
        if (response.ok) {
          const movie = await response.json();
          setMovie(movie);
        } else {
          setIsDataExist(false);
        }
      } catch (error) {
        if (retries > 0) {
          setRetries(retries - 1);
        }
      }
  }, [retries, authKey, movieId]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const handleWatch = () => {
    setShowTutorial(!showTutorial);
  };

  return (
    <div>
      {isDataExist ? (
        <div>
          <div className='iframe' id={showTutorial ? '' : 'hide'}>
            <Button size='very--small' onClick={() => handleWatch()}>
              X
            </Button>
            <iframe
              title='movie-tutorial'
              id={showTutorial ? '' : 'hide'}
              src={movie.video}
              frameBorder='0'
              allowFullScreen
            />
          </div>

          <div className='movie' id={showTutorial ? 'hide' : ''}>
            <div className='movie__image'>
              <img src={movie.image} alt='movieImage' />
            </div>
            <div className='movie__about'>
              <h1 className='movie__about--title'>{movie.title}</h1>
              <p>{movie.description}</p>

              <div className='movie__about--buttons'>
                <Button size='small' onClick={() => handleWatch()}>
                  Watch
                </Button>

                <Button
                  design={favoritesMovies.includes(movie.id) ? 'outline' : null}
                  onClick={() => toggleFavorite(movie.id)}
                  size='small'
                >
                  {favoritesMovies.includes(movie.id) ? 'Remove' : 'Add'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='error'>
          <h1 className='errorTitle'>This Movie Data is not exist...</h1>
          <Link to='/items'>
            <Button>Back To Movie List</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
