import {useState} from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import {FacebookShareButton , TelegramShareButton , TwitterShareButton , WhatsappShareButton , InstapaperShareButton , LinkedinShareButton} from 'react-share';

export default function NavBarShare() {

    return (
        <div className={styles.wholeCont}>
            <Link className={styles.eachMediaCont} href='https://api.whatsapp.com/send?phone=7219453584'
            style={{borderRadius : "25px 0 0 0" , backgroundImage: "url('/whatsAppLogo.png')"}}
                legacyBehavior>
                <a target='_blank'>

                </a>
            </Link>
        </div>
    )
}