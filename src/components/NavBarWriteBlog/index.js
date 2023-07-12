import { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { setSelected } from '../../features/modal/navbarSideSlice';
import { useDispatch } from 'react-redux';

export default function NavBarWriteBlog() {

    const dispatch = useDispatch();

    return (
        <div className={styles.wholeCont} >
            <p className={styles.contTitle}>Write Blog</p>
            <div className={styles.optionsCont}>
                <Link href='/newstory' className={styles.eachOptionCont}
                    onClick={e => dispatch(setSelected('writeBlog'))}>
                    <p className={styles.eachOption}>New Story</p>
                </Link>
                <Link href='/mystories' className={styles.eachOptionCont}
                    onClick={e => dispatch(setSelected('writeBlog'))}>
                    <p className={styles.eachOption}>My Stories</p>
                </Link>
            </div>
        </div>
    )
}