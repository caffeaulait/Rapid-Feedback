/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Header.module.css';
import React from 'react';
import Logo from '../../assets/images/logo.jpg';
import { Link, withRouter } from 'react-router-dom';

const Header = (props) => (
  <div className={styles.container}>
    <img src={Logo} alt='Unimelb logo' className={styles.logo}></img>
    <div className={styles.title}>Rapid Feedback</div>
    <ul className={'nav justify-content-end ' + styles.mynav}>
      <li className='nav-item'>
        <Link className='nav-link active' to='/home'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/admin'>
          Administration
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/assess'>
          Assessment
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/report'>
          Report
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Header);
