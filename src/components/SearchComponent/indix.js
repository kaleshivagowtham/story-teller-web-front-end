import {useEffect, useState} from 'react';
import styles from './styles.module.css';
import {useDispatch , useSelector} from 'react-redux';
import { closeSearchModal, openSearchModal } from '../../features/modal/searchModalSlice';

export default function SearchComponent(props) {

    useEffect(() => {
        setTimeout(() => {
            getTrendingBlogs();
        },1000)
    })

    const dispatch = useDispatch();

    const {isSearchModalOpen} = useSelector(store => store.searchModal);

    const [searchResult , setSearchResult] = useState([]);
    const [trendingSearch , setTrendingSearch] = useState([]);

    const testUrl = 'https://jsonplaceholder.typicode.com/posts';

    const searchHandler = (e) => {
        props.setSearchText(e.target.value);
        fetchSearchResultHandler();
    }

    const searchIconClickHandler = (e) => {
        isSearchModalOpen ? fetchSearchResultHandler() : dispatch(openSearchModal());
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
        <div className={`${isSearchModalOpen ? styles.wholeContSelected : styles.wholeCont}`} 
            onClick={e => {e.stopPropagation();dispatch(openSearchModal())}}>
            <div className={styles.searchCont}>
                <input placeholder='Search'
                    className={`${isSearchModalOpen ? styles.searchBoxSelected : styles.searchBox}`}
                    onChange={e => searchHandler(e)}
                />
                <img src={isSearchModalOpen ? '/searchIcon-green.png' :'/searchIcon.png'}
                    className={styles.searchIcon} 
                    alt='Search Icon'
                    onClick={e => searchIconClickHandler(e)}
                 />
            </div>
            {searchResult && isSearchModalOpen && <div className={styles.searchModal}>
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