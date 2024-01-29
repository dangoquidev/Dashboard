import React from "react";
import { CardWidget } from "../../Components/Card/Card"
import styles from './DashboardApp.module.css';

const DashboardApp = () => {
    return (
        <div className={styles.grid}>
            <CardWidget size="small" />
            <CardWidget size="medium" />
            <CardWidget size="large" />
            <CardWidget size="large" />
            <CardWidget size="medium" />
            <CardWidget size="small" />
        </div>
    )
}

export default DashboardApp
