import './App.scss';
import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Board from './containers/Board';

const App = () => {
  return(
    <div>
      <Nav />
      <Board />
      <Footer />
    </div>
  );
};
export default App;

