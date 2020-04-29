/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Header.module.css';
import React from 'react';
import Logo from '../../assets/images/logo.jpg';

const Header = (props) => (
  <div className={styles.container}>
    <img src={Logo} alt='Unimelb logo' className={styles.logo}></img>
    <div className={styles.title}>Rapid Feedback</div>
    <ul className={'nav justify-content-end ' + styles.mynav}>
      <li className='nav-item'>
        <a className='nav-link active' href='#'>
          Home
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Administration
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Assessment
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Report
        </a>
      </li>
    </ul>
  </div>
);

export default Header;
