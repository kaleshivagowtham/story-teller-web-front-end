import {useState} from 'react';
import styles from './styles.module.css';

export default function SearchComponent(props) {

    const searchHandler = (e) => {
        props.setSearchText(e.target.value);
        //write fetch function
    }

    const searchIconClickHandler = (e) => {
        props.openSearchModal ? fetchHandler() : props.setOpenSearchModal(true) ;
    }

    const fetchHandler = () => {
        console.log(props.searchText);
        //write fetch function and add link
    }

    return (
        <div className={`${props.openSearchModal ? styles.wholeContSelected : styles.wholeCont}`} 
            onClick={e => {e.stopPropagation();props.setOpenSearchModal(true)}}>
            <div className={styles.searchCont}>
                <input placeholder='Search'
                    className={`${props.openSearchModal ? styles.searchBoxSelected : styles.searchBox}`}
                    onChange={e => searchHandler(e)}
                />
                <img src={props.openSearchModal ? '/searchIcon-green.png' :'/searchIcon.png'}
                    className={styles.searchIcon} 
                    alt='Search Icon'
                    onClick={e => searchIconClickHandler(e)}
                 />
            </div>
            {props.openSearchModal && <div className={styles.searchModal}>

            </div>}
        </div>
    )
}