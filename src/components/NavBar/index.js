import {useState} from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import SearchComponent from '../SearchComponent/indix';

export default function NavBar() {

    const [openSearchModal , setOpenSearchModal] = useState(false);
    const [searchText , setSearchText] = useState('');
    const [selected , setSelected] = useState('home');


    return (
        <div className={styles.wholeCont} onClick={e => setOpenSearchModal(false)}>
            <div className={styles.topCont}>
                <Link href='/' className={styles.logoCont}>
                    <img src='/logo.png' alt='logo'  className={styles.logoImg} />
                </Link>
                <Link href='/' className={styles.nameCont}>
                    <div className={styles.nameCont}>
                        <p className={styles.logoName}>StoryTeller</p>
                        <p className={styles.logoSlogan}>Show us what you got</p>
                    </div>
                </Link>

                <SearchComponent 
                    setOpenSearchModal={setOpenSearchModal}
                    openSearchModal={openSearchModal}
                    setSearchText={setSearchText}
                    searchText={searchText}
                />

            </div>
            <div className={styles.sideCont}>
                <div className={styles.closed}>
                    <div className={`${selected === 'home' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                        onClick={e => setSelected('home')}>
                        <img src={selected === 'home' ?'/homeIcon-green.png' : '/homeIcon.png'} className={styles.eachMenuOptionImg} />
                    </div>
                    <div className={`${selected === 'dashboard' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                        onClick={e => setSelected('dashboard')}>
                        <img src={selected === 'dashboard' ?'/homeIcon-green.png' : '/homeIcon.png'} className={styles.eachMenuOptionImg} />
                    </div>
                    <div className={`${selected === 'search' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                        onClick={e => setSelected('search')}>
                        <img src={selected === 'search' ?'/searchIcon-green.png' : '/searchIcon.png'} className={styles.eachMenuOptionImg} />
                    </div>
                    <div className={styles.bottomDpCont} >
                        <div className={styles.dpImgCont}>
                            <img src='/demoDpImg.png' className={styles.dpImg} />
                        </div>
                    </div>
                </div>
                <div className={styles.opened}>

                </div>
            </div>
        </div>
    )
}