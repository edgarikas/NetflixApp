import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import logo from './images/F.png';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';
import Hero from './components/Hero/Hero';
import MovieCard from './components/MovieCard/MovieCard';
import Login from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';

const FREE_MOVIES_API =
  'https://dummy-video-api.onrender.com/content/free-items';
const FAVORITES_STORAGE_KEY = 'FELIX_FAVORITES';

class App extends React.Component {
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
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>;
    return (
      <div className='App'>
        <Header />

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

        <Footer />
      </div>
    );
  }
}

export default App;

{
  /* <BrowserRouter>
  <Routes>
    <Route path='/' element={<HomePage />}></Route>
    <Route path='/login' element={<Login />}></Route>
  </Routes>
</BrowserRouter>; */
}
