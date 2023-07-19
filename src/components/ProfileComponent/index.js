import {useEffect, useState , useMemo} from 'react';
import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { openLoginModal } from '../../features/modal/loginModalSlice';

export default function ProfileComponent() {

    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal)

    const dpUploadAPI = 'http://localhost:5000/dpupload'

    useEffect(() => {
        if(isLoggedIn === false){
            setTimeout(() => {
                dispatch(openLoginModal());
            },50)}
    },[isLoginModalOpen , isLoggedIn]);

    const formData = new FormData();

    const [backGroundImage , setBackGroundImage] = useState(null);
    const [dpImg , setDpImg] = useState('');
    const [uploadedDp , setUploadedDp] = useState('');
    const [dpUploadStatus , setDpUploadStatus] = useState();
    const [userFullName , setUserFullName] = useState('Shiva Gowtham Kale');
    const [userTagLine , setUserTagLine] = useState('Be the best');

    const dpUploadHandler = (e) => {
        setDpImg(e.target.files[0]);
    }

    const response = useMemo(() => {
        console.log('formdata : ',formData);
        fetch( dpUploadAPI , {
            method : 'POST',
            body : formData
        }).then(res => res.json())
        .then(JSON => {
            console.log(JSON);
            setDpUploadStatus(JSON);
        })
        .catch(err => console.log(err));
    },[formData]);

    const fdata = useMemo(() => {
        console.log(dpImg);
        formData.append('image' , dpImg);
    },[dpImg])

    return (
        <div className={styles.wholeCont}>
            <div className={styles.infoCard}>

            </div>
            <div className={styles.profileInfo}>
                <div className={styles.imageCont} >
                    <img src={dpImg==='' ? '/demoDpImg.png' : `${dpImg}`} alt='Dp' className={styles.dpImage}/>
                    <label className={styles.uploadBtnCont}>
                        <input type='file' className={styles.uploadBtn} onChange={e => dpUploadHandler(e)} />
                        <img src={'/cameraIcon.png'} alt='Add Dp' className={styles.addDpImage} />  
                    </label>
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