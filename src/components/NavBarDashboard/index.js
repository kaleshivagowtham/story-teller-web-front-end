import { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../features/modal/navbarSideSlice';

export default function NavBarDashboard() {

    const dispatch = useDispatch();

    return (
        <div className={styles.wholeCont}>
            <p className={styles.contTitle}>Dashboard</p>
            <div className={styles.optionsCont}>
                <Link href='/myprofile' className={styles.eachOptionCont} 
                    onClick={e => dispatch(setSelected('dashboard'))}>
                    <p className={styles.eachOption}>Profile</p>
                </Link>
                <Link href='/myprofile' className={styles.eachOptionCont}
                    onClick={e => dispatch(setSelected('dashboard'))}>
                    <p className={styles.eachOption}>Option 2</p>
                </Link>
                <Link href='/myprofile' className={styles.eachOptionCont}
                    onClick={e => dispatch(setSelected('dashboard'))}>
                    <p className={styles.eachOption}>Option 3</p>
                </Link>
                <Link href='/myprofile' className={styles.eachOptionCont}
                    onClick={e => dispatch(setSelected('dashboard'))}>
                    <p className={styles.eachOption}>Option 4</p>
                </Link>
            </div>
        </div>
    )
}