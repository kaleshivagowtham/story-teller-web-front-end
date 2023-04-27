import styles from './styles.module.css';
import { openNotification , closeNotification } from '../../features/modal/notificationSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function NotificationComponent({message}) {


    const {isNotificationOpen} = useSelector(store => store.notificationModel);
    const dispatch = useDispatch();

    useEffect(()=> {
        setTimeout(()=>{
            dispatch(closeNotification());
        },10000);
    },[isNotificationOpen])


    return (
        <div className={styles.wholeCont} >
            <div className={styles.messageCont}>
                <p className={styles.notificationMessage}>{message}</p>
            </div>
            <img src='/crossIcon.png' className={styles.crossIcon} onClick={e => dispatch(closeNotification())}/>
        </div>
    )
}