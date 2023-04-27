import { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

export default function NavBarDashboard() {

    return (
        <div className={styles.wholeCont}>
            <p className={styles.contTitle}>Dashboard</p>
            <div className={styles.optionsCont}>
                <Link href='/profile' className={styles.eachOptionCont}>
                    <p className={styles.eachOption}>Profile</p>
                </Link>
                <Link href='/profile' className={styles.eachOptionCont}>
                    <p className={styles.eachOption}>Option 2</p>
                </Link>
                <Link href='/profile' className={styles.eachOptionCont}>
                    <p className={styles.eachOption}>Option 3</p>
                </Link>
                <Link href='/profile' className={styles.eachOptionCont}>
                    <p className={styles.eachOption}>Option 4</p>
                </Link>
            </div>
        </div>
    )
}