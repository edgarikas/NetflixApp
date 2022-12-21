import React, { useState, useEffect, useCallback } from 'react';

import Button from '../Button/Button';
import MovieCard from '../MovieCard/MovieCard';
import Hero from '../Hero/Hero';
import Loader from '../Loader/Loader';

const FREE_MOVIES_API =
  'https://dummy-video-api.onrender.com/content/free-items';

function HomePage({ favoritesMovies, toggleFavorite }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [retries, setRetries] = useState(3);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(FREE_MOVIES_API);
      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to load');
      }
      const resultData = await response.json();

      setMovies(resultData);
    } catch (error) {
      if (retries > 0) {
        console.log(retries);
        setRetries(retries - 1);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [retries]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className=''>
      {error && <p>Whoops! 😱🏴‍☠️☁️</p>}
      <Hero title='Wanna More Content?' btnTitle='Get Access' />
      {loading && <Loader />}
      <div className='movie-list'>
        {movies.map(({ title, id, description, image }) => (
          <MovieCard
            id={id}
            key={id}
            title={title}
            description={description}
            image={image}
            isFavorite={favoritesMovies.includes(id)}
            onToggleFavorite={() => toggleFavorite(id)}
          />
        ))}
      </div>
      <div className='moreContent'>
        <Button>Get More Content</Button>
      </div>
    </main>
  );
}

export default HomePage;
