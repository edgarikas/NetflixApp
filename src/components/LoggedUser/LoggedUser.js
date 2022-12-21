import React, { useCallback, useState, useEffect } from 'react';

import MovieCard from '../MovieCard/MovieCard';
import Loader from '../Loader/Loader';

const MOVIES_API = 'https://dummy-video-api.onrender.com/content/items';

function LoggedUser({ auth, favoritesMovies, toggleFavorite }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [authKey] = useState(auth);
  const [retries, setRetries] = useState(3);

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (authKey) {
      try {
        const requestOption = {
          method: 'GET',
          headers: { authorization: authKey },
        };
        const response = await fetch(MOVIES_API, requestOption);
        const resultData = await response.json();

        setMovies(resultData);
      } catch (error) {
        if (retries > 0) {
          setRetries(retries - 1);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    } else window.location.pathname = '/';
  }, [retries, authKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className='App_main'>
      {error && <p>Whoops! 😱🏴‍☠️☁️</p>}
      {loading ? (
        <Loader />
      ) : (
        <div className='movie-list'>
          {movies.map(({ title, id, description, image }) => (
            <MovieCard
              isClickable='true'
              id={id}
              key={id}
              title={title}
              description={description}
              image={image}
              isFavorite={favoritesMovies.includes(id)}
              onToggleFavorite={() => toggleFavorite(id)}
            ></MovieCard>
          ))}
        </div>
      )}
    </main>
  );
}

export default LoggedUser;
