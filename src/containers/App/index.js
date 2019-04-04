import './index.scss';
import React from 'react';
import Nav from '../../components/Nav';
import Board from '../../components/Board';
import Footer from '../../components/Footer';

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

