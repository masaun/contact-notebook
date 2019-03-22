import React from 'react';
import styles from './footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.brand}>
      <div className={styles.created}>
      </div>
      <div className={styles.copyright}>
        Copyright © 2019
      </div>
    </div>
  </footer>
)

export default Footer;
