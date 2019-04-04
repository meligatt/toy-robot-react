import './index.scss';
import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Board from './containers/Board';

const App = () => {
  return(
    <div className = "app__container">
      <Nav />
      <Board />
      <Footer />
    </div>
  );
};
export default App;

