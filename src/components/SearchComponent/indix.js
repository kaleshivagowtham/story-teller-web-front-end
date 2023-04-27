import {useEffect, useState} from 'react';
import styles from './styles.module.css';

export default function SearchComponent(props) {

    useEffect(() => {
        setTimeout(() => {
            getTrendingBlogs();
        },1000)
    })

    const [searchResult , setSearchResult] = useState([]);
    const [trendingSearch , setTrendingSearch] = useState([]);

    const testUrl = 'https://jsonplaceholder.typicode.com/posts';

    const searchHandler = (e) => {
        props.setSearchText(e.target.value);
        fetchSearchResultHandler();
    }

    const searchIconClickHandler = (e) => {
        props.openSearchModal ? fetchSearchResultHandler() : props.setOpenSearchModal(true);
    }

    const getTrendingBlogs = async () => {
        const response = await fetch(testUrl)
            .then(res => res.json())
            .catch( err => console.log(err));
        setTrendingSearch(response);
    }

    const fetchSearchResultHandler = async () => {
        const response = await fetch(testUrl)
            .then(res => res.json())
            .catch( err => console.log(err));
        setSearchResult(response);
        console.log(response);
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
            {searchResult && props.openSearchModal && <div className={styles.searchModal}>
                <div className={styles.searchResultModals}>
                    <p className={styles.searchModalTitles}>Search results</p>
                    <div className={styles.searchScrollingBox}>
                        {searchResult.map((item) => {
                            return(
                                <div key={item} className={styles.eachSearchResultBox}>
                                    {/* <img src='/trendingIcon.png' className={styles.trendingIconImg}/> */}
                                    <p className={styles.eachSearchResult}>{item.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.searchResultModals}>
                    <p className={styles.searchModalTitles}>Trending </p>
                    <div className={styles.searchScrollingBox}>
                        {trendingSearch.map((item) => {
                            return(
                                <div key={item} className={styles.eachSearchResultBox}>
                                    <img src='/trendingIcon.png' className={styles.trendingIconImg}/>
                                    <p className={styles.eachSearchResult}>{item.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>}
        </div>
    )
}