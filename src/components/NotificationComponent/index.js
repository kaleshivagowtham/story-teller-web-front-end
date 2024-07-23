import styles from './styles.module.css';
import { openNotification , closeNotification } from '../../features/modal/notificationSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

export default function NotificationComponent({message}) {

    const [view, setView] = useState(true)

    useEffect(()=> {
        setTimeout(()=>{
            setView(false);
        },5000);
    },[])


    return (
        <div className={`${styles.wholeCont} ${view ? '' : styles.wholeContClose}`} >
            <div className={styles.messageCont}>
                <p className={styles.notificationMessage}>{message}</p>
            </div>
            <img src='/crossIcon.png' className={styles.crossIcon} onClick={e => setView(false)}/>
        </div>
    )
}