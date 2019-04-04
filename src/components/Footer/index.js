import React from 'react';

const Footer = () => {
  return(
    <footer className = "footer">
      <div className = "footer__container">
        <div className = "footer__author">
          <span>React Toy robot - 2019 by Melissa Gattoni.</span>
        </div>
        <ul  className = "footer__link-list">
          <li className = "footer__list-item">
            <a href = "https://github.com/meligatt/toy-robot-react" rel = 'noopener noreferrer' target = "_blank">Repo</a>
          </li>
          <li className = "footer__list-item">
            <a href = "https://www.linkedin.com/in/melissa-gattoni-54975b49/" rel = 'noopener noreferrer' target = "_blank">Author</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;