import Link from 'next/link';
import styles from './styles.module.css';

export default function NavBarDp() {

    const userName = 'abcdef';

    return (
        <div className={styles.wholeCont1}>
            <Link className={styles.eachProfileOption}
                href='/profile'>
                {userName}
            </Link>
            <p className={styles.eachProfileOption}>Sign out
                <img src='/signoutIcon.png' className={styles.signoutIcon}/>
            </p>
        </div>
    )
}