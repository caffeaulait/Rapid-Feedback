/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Header.module.css';
import React from 'react';
import Logo from '../../assets/images/logo.jpg';
import { NavLink, withRouter } from 'react-router-dom';

const Header = (props) => {
  // console.log(props.isCoordinator);
  return (
    <div className={styles.container}>
      <img src={Logo} alt='Unimelb logo' className={styles.logo}></img>
      <div className={styles.title}>Rapid Feedback</div>
      <ul className={'nav justify-content-end ' + styles.mynav}>
        <li className='nav-item'>
          <NavLink
            className='nav-link '
            activeStyle={{ color: '#348ceb' }}
            to='/home'
          >
            Home
          </NavLink>
        </li>
        <li
          className='nav-item'
          style={{ display: props.isCoordinator ? 'inline' : 'none' }}
        >
          <NavLink
            className='nav-link'
            activeStyle={{ color: '#348ceb' }}
            to='/admin'
          >
            Administration
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            className='nav-link'
            activeStyle={{ color: '#348ceb' }}
            to='/assess'
          >
            Assessment
          </NavLink>
        </li>
        <li
          className='nav-item'
          style={{ display: props.isCoordinator ? 'inline' : 'none' }}
        >
          <NavLink
            className='nav-link'
            activeStyle={{ color: '#348ceb' }}
            to='/report'
          >
            Report
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Header);
