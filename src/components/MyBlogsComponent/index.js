import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './styles.module.css';
import { setSelected } from '../../features/modal/navbarSideSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '../../features/modal/loginModalSlice';
import useLocalStorage from '../../utils/useLocalStorage';

export default function MyBlogsComponent() {

    const dispatch = useDispatch();

    const authorStoriesUrl = 'http://localhost:5000/mystories'

    const {isLoggedIn , userName} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal)

    console.log('userName: ', userName)

    useEffect(() => {
        if(isLoggedIn === false){
            setTimeout(() => {
                dispatch(openLoginModal());
            },50)}
    },[isLoginModalOpen]);


    // const [myStories , setMyStories] = useState([{'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},]);

    const [myStories , setMyStories] = useState(['']);
            
    useEffect(() => {

        const response = fetch(authorStoriesUrl , {
            method : 'POST',
            body : JSON.stringify({
                "writerId" : userName
            }),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
            }
        })
        .then(res => res.json())
        .then(JSON => {
            setMyStories(JSON.storiesList);
            console.log(myStories);
        })
        .catch(err => console.log(err));
    },[userName])

    return (
        <div className={styles.wholeCont}>
            <div className={styles.topCont}>

            </div>
            <div className={styles.bottomCont}>
                <div className={styles.blogsCont}>
                    {
                        myStories?.map((item) => {
                            return (
                                <Link key={item} className={styles.eachBlogCont}
                                    href={item.title?.replace(/ /g, '-') + '/'}
                                >
                                    <div className={styles.eachBlogImgCont}>
                                        <img src={item?.titleImg === null ? item?.titleImg : '/homePageBackground.jpeg'} alt='Title image' className={styles.eachBlogImg} />
                                    </div>
                                    <div className={styles.eachBlogTextCont}>
                                        <h4 className={styles.blogTitle}>{item?.title}</h4>
                                        <p className={styles.blogContent}>{item?.writerId}</p>
                                        <div className={styles.eachBlogContentCont}>
                                            <p className={styles.blogContent}>{item?.paras}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className={styles.tagsCont}>
                    
                </div>
            </div>
        </div>
    )
}