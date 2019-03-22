import React from 'react';
import styles from './header.module.scss';

const Header = () => (
  <div className={styles.header}>
    <nav id="menu" className="menu">
      <ul>
        <li><h1>Contact Notebook</h1></li>
        <li><a href="/contact_notebook" className={styles.link}> Contact Notebook</a></li>
        {process.env.NODE_ENV !== 'production' && (
        <li><a href="/counter" className={styles.link}> Counter</a></li>
        )}
        {process.env.NODE_ENV !== 'production' && (
          <li><a href="/evm" className={styles.link}> Wallet</a></li>
        )}
      </ul>
    </nav>
  </div>
)

export default Header;
