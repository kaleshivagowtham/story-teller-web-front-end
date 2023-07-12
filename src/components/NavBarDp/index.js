import Link from 'next/link';
import styles from './styles.module.css';
import { logoutAction } from '../../features/modal/loginSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function NavBarDp() {

    const dispatch = useDispatch();

    const {isLoggedIn ,userName} = useSelector(store => store.loggedIn);

    return (
        <div className={styles.wholeCont1}>
            <Link className={styles.eachProfileOption}
                href='/myprofile'>
                {userName}
            </Link>
            <p className={styles.eachProfileOption}
                onClick={e => dispatch(logoutAction())}>
                Sign out
                <img src='/signoutIcon.png' className={styles.signoutIcon}/>
            </p>
        </div>
    )
}