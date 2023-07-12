import { useState,useMemo } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import Profiles from '../../src/components/Profiles';

export default function Profile() {

    const router = useRouter();
    const [profileId, setProfileId] = useState('');

    const changeUrl = useMemo(() => {
        setProfileId(router.query.profileid);
    },[router.query.profileid])

    return(
        <div className={styles.wholeCont}>
            <Profiles profileId={profileId}/>
        </div>
    )
}