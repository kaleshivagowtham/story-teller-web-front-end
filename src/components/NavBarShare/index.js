import {useEffect, useState} from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
// import {FacebookShareButton , TelegramShareButton , TwitterShareButton , WhatsappShareButton , InstapaperShareButton , LinkedinShareButton} from 'react-share';

export default function NavBarShare() {

    const [currentUrl , setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href)
    })

    return (
        <div className={styles.wholeCont}>
            <Link href={"https://api.whatsapp.com/send?text=" + currentUrl} legacyBehavior>
                <a className={styles.eachMediaCont} target='_blank'
                    style={{borderRadius : "25px 0 0 0" , backgroundColor:"#25D366"}}>
                    <img src='/whatsAppLogo.png' className={styles.eachMediaImage} />
                </a>
            </Link>

            <Link href={"https://graph.facebook.com/?ids=" + currentUrl} legacyBehavior>
                <a className={styles.eachMediaCont} target='_blank'
                    style={{ backgroundColor:"#4267B2"}}>
                    <img src='/facebookLogo.png' className={styles.eachMediaImage} />
                </a>
            </Link>
            {/* <Link href={"https://twitter.com/intent/tweet?text=" + currentUrl} legacyBehavior> */}
            <Link href={"https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+"+&redirect_uri="+currentUrl} legacyBehavior>
                <a className={styles.eachMediaCont} target='_blank'
                    style={{backgroundColor:"#1DA1F2"}}>
                    <img src='/twitterLogo.png' className={styles.eachMediaImage} />
                </a>
            </Link>
            {/* <Link href={"https://www.linkedin.com/sharing/share-offsite/?url="+ currentUrl} legacyBehavior> */}
            <Link href={"https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+"+&redirect_uri="+currentUrl} legacyBehavior>
                <a className={styles.eachMediaCont} target='_blank'
                    style={{borderRadius : "0 0 0 25px" , backgroundColor:"#0077b5"}}>
                    <img src='/linkedinLogo.png' className={styles.eachMediaImage} />
                </a>
            </Link>
        </div>
    )
}