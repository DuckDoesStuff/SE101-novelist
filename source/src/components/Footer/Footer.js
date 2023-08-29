import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles["footer"]}>
          <p className={styles["title"]}> About Us </p>
            <div className={styles["frame"]}>
                <Link
                    to={"https://github.com/FuandB"}
                    className={styles["name"]}
                >
                    <i class="fa-brands fa-github"></i>
                    <p>FuandB</p>
                </Link>
                <Link
                    to={"https://github.com/hoangtukbl"}
                    className={styles["name"]}
                >
                    <i class="fa-brands fa-github"></i>
                    <p>hoangtukbl</p>
                </Link>
            </div>
            <div className={styles["frame"]}>
                <Link
                    to={"https://github.com/DuckDoesStuff"}
                    className={styles["name"]}
                >
                    <i class="fa-brands fa-github"></i>
                    <p>DuckDoesStuff</p>
                </Link>
                <Link
                    to={"https://github.com/nhungnguyen1503"}
                    className={styles["name"]}
                >
                    <i class="fa-brands fa-github"></i>
                    <p>nhungnguyen1503</p>
                </Link>
            </div>
            <div className={styles["frame"]}>
                <Link
                    to={"https://github.com/hnhnguyn"}
                    className={styles["name"]}
                >
                    <i class="fa-brands fa-github"></i>
                    <p>hnhnguyn</p>
                </Link>
            </div>
            <div className={styles["frame-logo"]}>
                <p className={styles["HCMUS"]}>
                    {" "}
                    From Ho Chi Minh University of Science{" "}
                </p>
                <div className={styles["logo-fit"]}>
                    <div className={styles["logo-hcmus"]}>
                        <img
                            src="/hcmus-logo-white.png"
                            className={styles["logo-hcmus"]}
                        ></img>
                    </div>
                    <p className={styles["fit-hcmus"]}> fit@hcmus</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
