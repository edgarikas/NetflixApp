import './App.css';

import React from 'react';
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

class App extends React.Component {
  state = {
    authKey: JSON.parse(window.localStorage.getItem('authKey')),
    favoritesMovies:
      JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
  };

  handleLogout = (e) => {
    if (e.target.id === 'Logout') {
      window.location.pathname = '/';
      window.localStorage.removeItem('authKey');
    } else {
      window.location.pathname = '/login';
    }
  };

  persistFavorites = (movie) => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(movie));
  };

  setFavorites = (movie) => {
    this.setState({ favoritesMovies: movie });
    this.persistFavorites(movie);
  };

  render() {
    const { authKey, favoritesMovies } = this.state;

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
              onClick={(e) => this.handleLogout(e)}
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
                    favoritesMovies={favoritesMovies}
                    setFavorites={this.setFavorites}
                  />
                }
              />
              <Route path='/login' element={<Login />} />
              <Route
                path='/items'
                element={
                  <LoggedUser
                    auth={authKey}
                    favoritesMovies={favoritesMovies}
                    setFavorites={this.setFavorites}
                  />
                }
              />
              <Route
                path='/items/:movieId'
                element={
                  <MovieDetails
                    auth={authKey}
                    favoritesMovies={favoritesMovies}
                    setFavorites={this.setFavorites}
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
}

export default App;

// function App() {
//   const [authKey, setAuthKey] = useState(
//     JSON.parse(window.localStorage.getItem('authKey'))
//   );

//   const handleLogout = (e) => {
//     if (e.target.id === 'Logout') {
//       window.location.pathname = '/';
//       window.localStorage.removeItem('authKey');
//     } else {
//       window.location.pathname = '/login';
//     }
//   };

//   return (
//     <div className='App'>
//       <BrowserRouter>
//         <Header>
//           <Link to={authKey ? '/items' : '/'}>
//             <img
//               className='Header__logo'
//               design='outline'
//               src={logo}
//               alt='logo'
//             />
//           </Link>

//           <Button
//             id={authKey ? 'Logout' : 'Login'}
//             onClick={(e) => handleLogout(e)}
//             size='small'
//           >
//             {authKey ? 'Logout' : 'Login'}
//           </Button>
//         </Header>

//         <main className='App_main'>
//           <Routes>
//             <Route path='/' element={<HomePage />} />
//             <Route path='/login' element={<Login />} />
//             <Route path='/items' element={<LoggedUser />} />
//             <Route path='/items/:movieId' element={<MovieDetails />} />
//           </Routes>
//         </main>
//       </BrowserRouter>

//       <Footer />
//     </div>
//   );
// }
