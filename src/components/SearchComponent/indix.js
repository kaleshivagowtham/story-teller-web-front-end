import {useEffect, useMemo, useState} from 'react';
import styles from './styles.module.css';
import {useDispatch , useSelector} from 'react-redux';
import { closeSearchModal, openSearchModal } from '../../features/modal/searchModalSlice';
import {routes} from '../../utils/routes';
import axios from 'axios';
import Link from 'next/link';

export default function SearchComponent({searchText, setSearchText}) {

    const searchURL = routes.baseUrl + routes.api.search;
    const searchStoryURL = routes.baseUrl + routes.api.getStory;

    const dispatch = useDispatch();

    const {isSearchModalOpen} = useSelector(store => store.searchModal);

    const [searchResult , setSearchResult] = useState({
                                                        authors : [],
                                                        chapters : [{'storyTitle' : 'Lorem Ipsum 4',
                                                            'title' : 'Chapter 1',
                                                            'chapterNumber' : 1
                                                        },
                                                        {'storyTitle' : 'Lorem Ipsum 4',
                                                            'title' : 'Chapter 2',
                                                            'chapterNumber' : 2
                                                        },
                                                        ],});
    const [hoveredStory, setHoveredStory] = useState({
                                                        storyTitle : 'Lorem Ipsum 4',
                                                        desc : '',
                                                        writerId : 'ShivaKale',
                                                        titleImg : '/libImg.jpeg',

                                                    });
    const [hoveredChapter, setHoveredChapter] = useState({'chapterTitle': '',
                                                          'storyTitle' : ''
                                                        })
    const [trendingSearch , setTrendingSearch] = useState([]);

    // const testUrl = 'https://jsonplaceholder.typicode.com/posts';

    const searchHandler = (e) => {
        setSearchText(e.target.value);
        // fetchSearchResultHandler();
    }

    const searchIconClickHandler = (e) => {
        isSearchModalOpen ? fetchSearchResultHandler() : dispatch(openSearchModal());
    }

    // Can Remove
    // const getTrendingBlogs = async () => {
    //     const response = await fetch(testUrl)
    //         .then(res => res.json())
    //         .catch( err => console.log(err));
    //     setTrendingSearch(response);
    // }

    // const fetchSearchResultHandler = async () => {
    //     const response = await fetch(testUrl)
    //         .then(res => res.json())
    //         .catch( err => console.log(err));
    //     setSearchResult(response);
    //     console.log(response);
    // }

    useMemo(() => {

        if(searchText?.length === 0) {
            setSearchResult({})
            setHoveredChapter(null)
            setHoveredStory(null)
            return;
        }

        axios.post( searchURL, {
            searchText
        })
        .then((resp) => {
            if(resp.data)
                setSearchResult(resp.data)
            // console.log("search res: ", resp.data)
        })
        .catch(err => {
            console.log("Search error: ",err.message)
        })
    },[searchText])

    // console.log(hoveredChapter)
    // const searchHoveredStoryHandler = (storyTitle, title) => {

    //     setHoveredChapter({storyTitle : storyTitle, chapterTitle : title})
    //     console.log(hoveredChapter.storyTitle == storyTitle);
    //     console.log(hoveredChapter.chapterTitle == title);
    // }

    useMemo(() => {

        if(hoveredChapter === undefined || hoveredChapter === null)
            return;

        axios.post( searchStoryURL, {
            storyTitle : hoveredChapter?.storyTitle
        })
        .then((resp) => {
            if(resp.data)
                setHoveredStory(resp.data)
            console.log(hoveredStory)
        })
        .catch(err => {
            console.log("Search error: ",err.message)
        })

    },[hoveredChapter?.storyTitle])

    const closeSearchModelHandler = () => {
        dispatch(closeSearchModal());
        console.log(isSearchModalOpen);
    }

    // const dropdownClickHandler = (link) => {
    //     if(router)
    //         router.push(link)
    //     dispatch(closeSearchModal());
    // }

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
                    // onClick={e => searchIconClickHandler(e)}
                 />
            </div>
            {searchResult && isSearchModalOpen && 
                <div className={styles.searchModal}>
                    <div className={styles.searchResultModals}>
                        <p className={styles.searchModalTitles}>Chapters</p>
                        <div className={styles.searchScrollingBox}>
                            {searchResult?.chapters?.map((item) => {
                                return(
                                    <Link key={item}
                                        className={`${styles.eachChapterResultBox} ${hoveredChapter?.storyTitle === item?.storyTitle && hoveredChapter?.chapterTitle === item?.title ? styles.eachChapterResultBoxHovered : ''}`} 
                                        onMouseEnter = {e => setHoveredChapter({storyTitle : item?.storyTitle, chapterTitle : item?.title})}
                                        href={'/' + item?.storyTitle?.replace(/ /g, '-') + '/chapter/' + item?.chapterNumber}
                                        onClick={e => {e.stopPropagation();dispatch(closeSearchModal())}}
                                    >
                                        {/* <img src='/trendingIcon.png' className={styles.trendingIconImg}/> */}
                                        <p className={styles.eachChapterResultTitle}>{item?.storyTitle}</p>
                                        <p className={styles.eachSearchResult}>{item?.chapterNumber}. {item?.title}</p>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.searchResultModals}>
                        <p className={styles.searchModalTitles}>Novel </p>
                        <div className={styles.searchScrollingNovelBox}>
                            {/* {trendingSearch?.map((item) => {
                                return(
                                    <div key={item} className={styles.eachSearchResultBox}>
                                        <img src='/trendingIcon.png' className={styles.trendingIconImg}/>
                                        <p className={styles.eachSearchResult}>{item.title}</p>
                                    </div>
                                )
                            })} */}
                            {hoveredStory && 
                                <div className={styles.hoveredStoryTopCont}>
                                    <img className={styles.hoveredStoryPoster}
                                        src={hoveredStory?.titleImg} alt='Novel poster'
                                    />
                                    <div className={styles.hoveredStoryTopRightCont}>
                                        <Link className={styles.hoveredStoryTitle}
                                            href={ '/' + hoveredStory?.title?.replace(/ /g, '-')}
                                            onClick={e => {e.stopPropagation();dispatch(closeSearchModal())}}
                                        >
                                            Title: {hoveredStory?.title}
                                        </Link>
                                        <Link className={styles.hoveredStoryWriterId}
                                            href={'/profile/' + hoveredStory?.writerId}
                                            onClick={e => {e.stopPropagation();dispatch(closeSearchModal())}}
                                        >
                                            Writer: {hoveredStory?.writerId}
                                        </Link>
                                    </div>
                                </div>
                            }
                            <p className={styles.hoveredStoryDesc}>{hoveredStory?.paras}</p>
                        </div>
                        <p className={styles.searchModalTitles}>Similar Authors </p>
                        <div className={`${styles.searchScrollingBox} ${styles.searchScrollingBoxRightBottom}`}>
                            {trendingSearch?.map((item) => {
                                return(
                                    <div key={item} className={styles.eachSearchResultBox}>
                                        <img src='/trendingIcon.png' className={styles.trendingIconImg}/>
                                        <p className={styles.eachSearchResult}>@ {item.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}