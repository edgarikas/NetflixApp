import React from 'react';
import { Link } from 'react-router-dom';

import './MovieDetails.css';
import Button from '../Button/Button';

const FAVORITES_STORAGE_KEY = 'FELIX_FAVORITES';

class MovieDetails extends React.Component {
  state = {
    movie: '',
    isDataExist: true,
    favorites:
      JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
    isFavorite: false,
  };
  async componentDidMount() {
    const movieRef = window.location.pathname.split('/');
    const movieId = movieRef[2];
    const { favorites } = this.state;

    favorites.includes(movieId)
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
      this.setState({ isFavorite: false });
      this.setState((prevState) => {
        return {
          favorites: prevState.favorites.filter((movieId) => movieId !== id),
        };
      }, this.persistFavorites);
    } else {
      this.setState({ isFavorite: true });
      this.setState((prevState) => {
        return { favorites: prevState.favorites.concat(id) };
      }, this.persistFavorites);
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
