import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useMemo } from 'react';
import LoadingComponent from '../LoadingComponent';

export default function Profiles({profileId}) {

    const profileUrl = "http://localhost:5000/profileinfo";

    const [profileInfo , setProfileInfo] = useState({'fName' : null,
                                                    'email' : null,
                                                    'username' : null});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true);

        const response = fetch(profileUrl , {
            method : 'POST',
            body : JSON.stringify({
                profileInfo : profileId
            }),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(JSON => {
            setProfileInfo(JSON.user[0])
            setIsLoading(false);
        })
        .catch(err => console.log(err));
    },[profileId])

    // console.log('profileInfo ',profileInfo);

    return(
        <div className={styles.wholeCont}>
        {/* {profileInfo.username === null && <LoadingComponent />} */}
            {isLoading && <LoadingComponent />}
            <div className={styles.infoCard}>

            </div>
            <div className={styles.profileInformation}>
                <div className={styles.imageCont} >
                    {/* <img src={dpImg==='' ? '/demoDpImg.png' : `${dpImg}`} alt='Dp' className={styles.dpImage}/> */}
                    <img src={'/demoDpImg.png'} alt='Dp' className={styles.dpImage}/>
                </div>
                <div className={styles.allInfoCont}>
                    <div className={styles.nameCont}>
                        <h3 className={styles.profileName}>{profileInfo?.fName}</h3>
                        <p className={styles.tagLine}>{profileInfo?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}