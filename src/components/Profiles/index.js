import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useMemo } from 'react';
import LoadingComponent from '../LoadingComponent';

export default function Profiles({profileId}) {

    const profileUrl = "http://localhost:5000/profileinfo";

    const [profileInfo , setProfileInfo] = useState(null);

    useEffect(() => {
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
        .then((data) => {
            setProfileInfo(data);
            console.log(profileInfo);
        })
        .catch(err => console.log(err));
    },[profileId])

    return(
        <div className={styles.wholeCont}>
        {profileInfo === null && <LoadingComponent />}
            <p className={styles.text}>{profileId}</p>
        </div>
    )
}