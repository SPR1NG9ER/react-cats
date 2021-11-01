import React from 'react';
import Cat from "./cat.gif";
import styles from "./preloader.module.css";

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={Cat} alt={""}/>
        </div>
    );
};

export default Preloader;
