import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
        <div className={styles["frame"]}>
            <p className={styles["title"]}> About Us </p>
            <Link to={'https://github.com/nhungnguyen1503'} className={styles["name"]}>
            <i class="fa-brands fa-github"></i><p>nhungnguyen1503</p>
            </Link>
            <Link to={'https://github.com/FuandB'} className={styles["name"]}>
            <i class="fa-brands fa-github"></i><p>FuandB</p>
            </Link>
            <Link to={'https://github.com/hoangtukbl'} className={styles["name"]}>
            <i class="fa-brands fa-github"></i><p>hoangtukbl</p>
            </Link>
            <Link to={'https://github.com/hnhnguyn'} className={styles["name"]}>
            <i class="fa-brands fa-github"></i><p>hnhnguyn</p>
            </Link>
            <Link to={'https://github.com/DuckDoesStuff'} className={styles["name"]}>
            <i class="fa-brands fa-github"></i><p>DuckDoesStuff</p>
            </Link>
        </div>
        <p className={styles["HCMUS"]}> From Ho Chi Minh University of Science </p>
    </div>
  )
}

export default Footer;
