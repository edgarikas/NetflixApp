import React from 'react';

import MovieCard from '../MovieCard/MovieCard';
import Loader from '../Loader/Loader';

const MOVIES_API = 'https://dummy-video-api.onrender.com/content/items';

class LoggedUser extends React.Component {
  state = {
    loading: false,
    error: false,
    movies: [],
    authKey: this.props.auth,
  };

  async componentDidMount() {
    const { authKey } = this.state;
    console.log(authKey);
    if (authKey) {
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
    } else window.location.pathname = '/';
  }

  toggleFavorite = (id) => {
    const { favoritesMovies } = this.props;

    if (favoritesMovies.includes(id)) {
      this.props.setFavorites(
        favoritesMovies.filter((movieId) => movieId !== id)
      );
    } else {
      this.props.setFavorites(this.props.favoritesMovies.concat(id));
    }
  };
  render() {
    const { movies, loading, error } = this.state;
    const { favoritesMovies } = this.props;

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
