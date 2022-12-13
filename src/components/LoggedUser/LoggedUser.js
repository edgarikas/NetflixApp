import React from 'react';

import MovieCard from '../MovieCard/MovieCard';
import Loader from '../Loader/Loader';

const FAVORITES_STORAGE_KEY = 'FELIX_FAVORITES';
const MOVIES_API = 'https://dummy-video-api.onrender.com/content/items';

class LoggedUser extends React.Component {
  state = {
    loading: false,
    error: false,
    movies: [],
    favorites:
      JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
    authKey: JSON.parse(window.localStorage.getItem('authKey')) || [],
  };

  async componentDidMount() {
    const { authKey } = this.state;
    this.setState({ loading: true });
    try {
      const requestOption = {
        method: 'GET',
        headers: { authorization: authKey },
      };
      const response = await fetch(MOVIES_API, requestOption);

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
                isFavorite={favorites.includes(id)}
                onToggleFavorite={() => this.toggleFavorite(id)}
              ></MovieCard>
            ))}
          </div>
        )}
      </main>
    );
  }
}

export default LoggedUser;
