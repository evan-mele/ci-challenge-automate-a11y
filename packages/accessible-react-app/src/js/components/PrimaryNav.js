import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import homeIcon from '../../img/home-symbol.png';

const PrimaryNav = props => {
  const { ariaLabel } = props;

  return (
    <nav aria-label={ariaLabel}>
      {/* FE Talking Point - Unique aria-labels for repeated blocks like <nav> */}
      <ul className="ac-primary-nav">
        <li className="ac-primary-nav__list-item">
          <Link to="/">
          <img className="home_icon" src={homeIcon} alt="Home" width="24" height="24"/>
            Home
          </Link>
        </li>
        <li className="ac-primary-nav__list-item">
          <Link to="/about">About AnyCorp</Link>
        </li>
        <li className="ac-primary-nav__list-item">
          <Link to="/awards">Awards We&rsquo;ve Won</Link>
        </li>
        <li className="ac-primary-nav__list-item">
          <Link to="/feedback">Your Feedback</Link>
        </li>
      </ul>
    </nav>
  );
};

PrimaryNav.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
};

export default PrimaryNav;
