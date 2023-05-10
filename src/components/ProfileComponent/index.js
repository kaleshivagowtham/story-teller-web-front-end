import {useEffect, useState} from 'react';
import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { openLoginModal } from '../../features/modal/loginModalSlice';

export default function ProfileComponent() {

    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal)

    useEffect(() => {
        if(isLoggedIn === false){
            setTimeout(() => {
                dispatch(openLoginModal());
            },50)}
    },[isLoginModalOpen]);

    const [backGroundImage , setBackGroundImage] = useState(null);
    const [userFullName , setUserFullName] = useState('Shiva Gowtham Kale');
    const [userTagLine , setUserTagLine] = useState('Be the best');

    return (
        <div className={styles.wholeCont}>
            {/* <div className={styles.block}></div> */}
            <div className={styles.infoCard}>

            </div>
            <div className={styles.profileInfo}>
                <div className={styles.imageCont} >
                    <img src={'/demoDpImg.png'} alt='Dp' className={styles.dpImage}/>
                    <img src={'/cameraIcon.png'} alt='Add Dp' className={styles.addDpImage} />
                </div>
                <div className={styles.allInfoCont}>
                    <div className={styles.nameCont}>
                        <h3 className={styles.profileName}>{userFullName}</h3>
                        <p className={styles.tagLine}>{userTagLine}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}