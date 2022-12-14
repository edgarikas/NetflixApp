import React from 'react';
import { Link } from 'react-router-dom';

import './MovieDetails.css';
import Button from '../Button/Button';

class MovieDetails extends React.Component {
  state = {
    movie: '',
    isDataExist: true,
    isFavorite: false,
    authKey: this.props.auth,
  };
  async componentDidMount() {
    const movieRef = window.location.pathname.split('/');
    const movieId = movieRef[2];

    const { authKey } = this.state;
    const { favoritesMovies } = this.props;

    if (authKey) {
      favoritesMovies.includes(movieId)
        ? this.setState({ isFavorite: true })
        : this.setState({ isFavorite: false });

      try {
        const response = await fetch(
          `https://dummy-video-api.onrender.com/content/items/${movieId}`
        );
        if (response.ok) {
          const movie = await response.json();

          this.setState({ movie });
        } else {
          this.setState({ isDataExist: false });
        }
      } catch (error) {
        console.log(error);
      }
    } else window.location.pathname = '/';
  }

  toggleFavorite = (id) => {
    const { favoritesMovies } = this.props;

    if (favoritesMovies.includes(id)) {
      this.setState({ isFavorite: false });
      this.props.setFavorites(
        favoritesMovies.filter((movieId) => movieId !== id)
      );
    } else {
      this.setState({ isFavorite: true });
      this.props.setFavorites(this.props.favoritesMovies.concat(id));
    }
  };
  render() {
    const { movie, isDataExist, isFavorite } = this.state;

    return (
      <div>
        {isDataExist ? (
          <div className='movie'>
            <div className='movie__image'>
              <img src={movie.image} alt='movieImage' />
            </div>
            <div className='movie__about'>
              <h1 className='movie__about--title'>{movie.title}</h1>
              <p>{movie.description}</p>

              <div className='movie__about--buttons'>
                <a target='_blank' href={movie.video} rel='noreferrer'>
                  <Button size='small'>Watch</Button>
                </a>
                <Button
                  design={isFavorite ? 'outline' : null}
                  onClick={() => this.toggleFavorite(movie.id)}
                  size='small'
                >
                  {isFavorite ? 'Remove' : 'Add'}
                </Button>
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
}

export default MovieDetails;
