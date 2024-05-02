import { useEffect,useState,useMemo } from 'react';
import styles from './styles.module.css';
import TagsSelector from '../TagsSelector';
import TitleSliderComponent from '../TitleSliderComponent';
import { routes } from '../../utils/routes';
import Link from 'next/link';
import axios from 'axios';

export default function HomeNotLoggedIn() {

    const trendingTitleAPI = `${routes.baseUrl}${routes.api.trending}`;
    // console.log(trendingTitleAPI)

    const [trending , setTrending] = useState([ ]);
    const [recommendedBlogs, setRecommendedBlogs] = useState([{title:'Tbc def ghi'} ]);

    const [trendingTags , setTrendingTags] = useState(['abssssc','desssssssssf','ghi','jkl','mssssssssno','pssssssqr','stu','vssssssswx','yzsssssss','abssssssssc','def','ghssssssssi','jsssssskl','mno','pssssssssssssssqr','stu','sssssssvwx','yz','abc','def','ghi','jkl','mno','pqr','stu','vwx','yz']);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const response = axios.get( trendingTitleAPI)
        .then(resp => {
            console.log("data: ", resp.data);
            if(resp.data)
                setTrending(resp.data);
            if(resp.data.trendingTags)
                setTrendingTags(resp.data.trendingTags);
        })
        .catch(err => console.log("Error Here: ",err.message))
    },[]);

    return (
        <div className={styles.wholeCont}>
            <TitleSliderComponent trending={trending} />
            <TagsSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} 
                trendingTags={trendingTags} setTrendingTags={setTrendingTags} />
            <div className={styles.contentCont}>
                <div className={styles.blogsCont}>
                    <h3 className={styles.trendingBlogsTitle} >Trending Blogs</h3>
                    <div className={styles.recommendedBlogsCont}>
                    {
                        trending?.map((item) => {
                            return (
                                <Link key={item} href={`story/${item.title.replace(/ /g,'-')}`} className={styles.eachRecommendedBlog}>
                                    <img src={item.image} className={styles.eachRecommendedBlogImg} />
                                    <div className={styles.eachRecommendedBlogContent}>
                                        <p className={styles.eachRecommendedBlogTitle} >{item.title}</p>
                                        <p className={styles.eachRecommendedBlogDesc} >{item.desc}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    </div>
                </div>
                <div className={styles.rightCont}>
                    
                </div>
            </div>
        </div>
    )
}