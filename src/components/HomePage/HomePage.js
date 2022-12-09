import React from 'react';

import Button from '../Button/Button';
import MovieCard from '../MovieCard/MovieCard';
import Hero from '../Hero/Hero';

const FREE_MOVIES_API =
  'https://dummy-video-api.onrender.com/content/free-items';
const FAVORITES_STORAGE_KEY = 'FELIX_FAVORITES';

class HomePage extends React.Component {
  state = {
    loading: false,
    error: false,
    movies: [],
    favorites:
      JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const response = await fetch(FREE_MOVIES_API);

      if (response.status > 399 && response.status < 600) {
        throw new Error('failed to load');
      }

      const movies = await response.json();

      this.setState({ movies });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  persistFavorites = () => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(this.state.favorites)
    );
  };

  toggleFavorite = (id) => {
    const { favorites } = this.state;

    if (favorites.includes(id)) {
      this.setState((prevState) => {
        return {
          favorites: prevState.favorites.filter((movieId) => movieId !== id),
        };
      }, this.persistFavorites);
    } else {
      this.setState((prevState) => {
        return { favorites: prevState.favorites.concat(id) };
      }, this.persistFavorites);
    }
  };

  render() {
    const { movies, loading, error, favorites } = this.state;

    return (
      <main className='App_main'>
        {loading && <p>Loading...</p>}
        {error && <p>Whoops! 😱🏴‍☠️☁️</p>}
        <Hero title='Wanna More Content?' btnTitle='Get Access' />

        <div className='movie-list'>
          {movies.map(({ title, id, description, image }) => (
            <MovieCard
              id={id}
              key={id}
              title={title}
              description={description}
              image={image}
              isFavorite={favorites.includes(id)}
              onToggleFavorite={() => this.toggleFavorite(id)}
            />
          ))}
        </div>

        <div className='moreContent'>
          <Button>Get More Content</Button>
        </div>
      </main>
    );
  }
}

export default HomePage;
