import { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../features/modal/navbarSideSlice';

export default function NavBarHome() {

    const dispatch = useDispatch();

    return (
        <div className={styles.wholeCont}>
            <p className={styles.contTitle}>Home</p>
            <div className={styles.optionsCont}>
                <Link href='/myprofile' className={styles.eachOptionCont} 
                    onClick={e => dispatch(setSelected('home'))}>
                    <p className={styles.eachOption}>Profile</p>
                </Link>
                <Link href='/myprofile' className={styles.eachOptionCont} 
                    onClick={e => dispatch(setSelected('home'))}>
                    <p className={styles.eachOption}>Option 2</p>
                </Link>
                <Link href='/myprofile' className={styles.eachOptionCont} 
                    onClick={e => dispatch(setSelected('home'))}>
                    <p className={styles.eachOption}>Option 3</p>
                </Link>
                <Link href='/myprofile' className={styles.eachOptionCont} 
                    onClick={e => dispatch(setSelected('home'))}>
                    <p className={styles.eachOption}>Option 4</p>
                </Link>
            </div>
        </div>
    )
}