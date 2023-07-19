import { useEffect,useState,useMemo } from 'react';
import styles from './styles.module.css';
import TagsSelector from '../TagsSelector';
import TitleSliderComponent from '../TitleSliderComponent';

export default function HomeNotLoggedIn() {

    const trendingTitleAPI = 'http://localhost:5000/trending';

    const [trending , setTrending] = useState([
                                            {
                                                title : 'abcdefg1',
                                                image : '/home-title.avif',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg2',
                                                image : '/demoDpImg.png',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg3',
                                                image : '/home-title.jpg',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg4',
                                                image : '/homePageBackground.jpeg',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg5',
                                                image : '/libImg.jpeg',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg6',
                                                image : '/demoDpImg.png',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                        ]);
    const [recommendedBlogs, setRecommendedBlogs] = useState([
                                                {
                                                title : 'abcdefg1',
                                                image : '/home-title.avif',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg2',
                                                image : '/demoDpImg.png',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg3',
                                                image : '/home-title.jpg',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg4',
                                                image : '/homePageBackground.jpeg',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg5',
                                                image : '/libImg.jpeg',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
                                            {
                                                title : 'abcdefg6',
                                                image : '/demoDpImg.png',
                                                desc : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                                            },
    ]);

    const [trendingTags , setTrendingTags] = useState(['abssssc','desssssssssf','ghi','jkl','mssssssssno','pssssssqr','stu','vssssssswx','yzsssssss','abssssssssc','def','ghssssssssi','jsssssskl','mno','pssssssssssssssqr','stu','sssssssvwx','yz','abc','def','ghi','jkl','mno','pqr','stu','vwx','yz']);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const response = fetch( trendingTitleAPI)
        .then(res => res.json)
        .then(JSON => {
            if(JSON.trending)
            setTrending(JSON.trending);
            if(JSON.trendingTags)
            setTrendingTags(JSON.trendingTags);
        })
        .catch(err => console.log(err))
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
                        recommendedBlogs.map((item) => {
                            return (
                                <div key={item} className={styles.eachRecommendedBlog}>
                                    <img src={item.image} className={styles.eachRecommendedBlogImg} />
                                    <div className={styles.eachRecommendedBlogContent}>
                                        <p className={styles.eachRecommendedBlogTitle} >{item.title}</p>
                                        <p className={styles.eachRecommendedBlogDesc} >{item.desc}</p>
                                    </div>
                                </div>
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