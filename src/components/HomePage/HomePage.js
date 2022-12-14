import React from 'react';

import Button from '../Button/Button';
import MovieCard from '../MovieCard/MovieCard';
import Hero from '../Hero/Hero';
import Loader from '../Loader/Loader';

const FREE_MOVIES_API =
  'https://dummy-video-api.onrender.com/content/free-items';

class HomePage extends React.Component {
  state = {
    loading: false,
    error: false,
    movies: [],
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

  toggleFavorite = (id) => {
    const { favoritesMovies } = this.props;

    if (favoritesMovies.includes(id)) {
      this.props.setFavorites(
        favoritesMovies.filter((movieId) => movieId !== id)
      );
    } else {
      this.props.setFavorites(favoritesMovies.concat(id));
    }
  };

  render() {
    const { movies, loading, error } = this.state;
    const { favoritesMovies } = this.props;

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

// persistFavorites = () => {
//   window.localStorage.setItem(
//     FAVORITES_STORAGE_KEY,
//     JSON.stringify(this.state.favorites)
//   );
// };

// toggleFavorite = (id) => {
//   const { favorites } = this.state;
//   const { favoritesMovies } = this.props;

//   if (favorites.includes(id)) {
//     console.log('remove');
//     this.props.setFavorites(
//       favoritesMovies.filter((movieId) => movieId !== id)
//     );
//     this.setState((prevState) => {
//       return {
//         favorites: prevState.favorites.filter((movieId) => movieId !== id),
//       };
//     }, this.persistFavorites);
//   } else {
//     this.setState((prevState) => {
//       console.log('add');
//       this.props.setFavorites(this.props.favoritesMovies.concat(id));
//       return { favorites: prevState.favorites.concat(id) };
//     }, this.persistFavorites);
//   }
// };
