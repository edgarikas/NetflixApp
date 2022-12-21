import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import logo from './images/F.png';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';

import Login from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import LoggedUser from './components/LoggedUser/LoggedUser';
import MovieDetails from './components/MovieDetails/MovieDetails';

const FAVORITES_STORAGE_KEY = 'FELIX_FAVORITES';

function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || []
  );
  const [authKey] = useState(
    JSON.parse(window.localStorage.getItem('authKey')) || ''
  );

  const handleLogout = (e) => {
    if (e.target.id === 'Logout') {
      window.location.pathname = '/';
      window.localStorage.removeItem('authKey');
    } else {
      window.location.pathname = '/login';
    }
  };

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const toggleFavorite = (id) => {
    let newFavorites = [...favorites];

    if (favorites.includes(id)) {
      newFavorites = newFavorites.filter((movieId) => movieId !== id);
    } else {
      newFavorites = newFavorites.concat(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Header>
          <Link to={authKey ? '/items' : '/'}>
            <img
              className='Header__logo'
              design='outline'
              src={logo}
              alt='logo'
            />
          </Link>

          <Button
            id={authKey ? 'Logout' : 'Login'}
            onClick={(e) => handleLogout(e)}
            size='small'
          >
            {authKey ? 'Logout' : 'Login'}
          </Button>
        </Header>

        <main className='App_main'>
          <Routes>
            <Route
              path='/'
              element={
                <HomePage
                  favoritesMovies={favorites}
                  toggleFavorite={(id) => toggleFavorite(id)}
                />
              }
            />
            <Route path='/login' element={<Login />} />
            <Route
              path='/items'
              element={
                <LoggedUser
                  auth={authKey}
                  favoritesMovies={favorites}
                  toggleFavorite={(id) => toggleFavorite(id)}
                />
              }
            />
            <Route
              path='/items/:movieId'
              element={
                <MovieDetails
                  auth={authKey}
                  favoritesMovies={favorites}
                  toggleFavorite={(id) => toggleFavorite(id)}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
