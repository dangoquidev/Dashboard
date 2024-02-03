import React from "react";
import { CardWidget } from "../../Components/Card/Card"
import styles from './DashboardApp.module.css';

const DashboardApp = () => {
    return (
        <div className={styles.grid}>
            <CardWidget size="medium" />
        </div>
    )
}

export default DashboardApp
