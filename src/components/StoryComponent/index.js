import { useEffect, useState } from "react";
import styles from './styles.module.css';
import axios from "axios";
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useSelector, useDispatch} from 'react-redux';
import { closeLoginModal, openLoginModal } from "../../features/modal/loginModalSlice";

export default function StoryComponent({storyTitle}) {

    const baseUrl = 'http://localhost:5000/getstory';
    const likeUrl = 'http://localhost:5000/checkliked';
    const commentUrl = 'http://localhost:5000/checkcomment';

    const router = useRouter();

    const dispatch = useDispatch();

    const {isLoggedIn, userName} = useSelector(store => store.loggedIn);


    // const [story, setStory] = useState({});
    const [currFocus, setCurrFocus] = useState('');
    const [s,b] = useState();

    const [story, setStory] = useState({'writerId' : 'shivakale123',
                                        'title' : 'The Legends of the legendary legend',
                                        'paras' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
                                        'titleImg' : '',
                                        'likes' : ['a','b','c'],
                                        'comments' : [{'commentBy':'a','comment' : '','date':'','time' : ''},
                                                    {'commentBy':'b', 'comment' : '','date' : '','time' : ''},
                                                    {'commentBy':'c', 'comment' : '', 'date' : '','time' : ''}]
                                        });

    useEffect(() => {
        if(storyTitle === undefined)
            return;
        axios.post(baseUrl , {
            storyTitle : storyTitle?.replace(/-/g, ' ')
        })
        .then(res => {
            setStory(res.data);
        })
    },[storyTitle])

    const updateHandler = () => {
        router.replace('/profile');
    }

    const likeHandler = () => {
        if(isLoggedIn === false){
            dispatch(openLoginModal());
        }
        else{
            const likedCheck = axios(likeUrl ,{
                userName : userName,
                storyTitle : storyTitle
            })
            .then (res => {
                if(res.data.status === 'Liked Successfully'){
                    setStory(res.data.content);
                }
                else
                    console.log("already liked");
            })
        }
    }

    const commentsHandler = () => {
        if(isLoggedIn === false){
            dispatch(openLoginModal());
        }
        else{
            const likedCheck = axios(likeUrl ,{
                userName,
                storyTitle
            })
            .then (res => {
                if(res === 'No')
                    story.comments.push(userName);
                else
                    console.log("already liked")
            })
        }
    }

    const bookmarkHandler = () => {
        if(isLoggedIn === false){
            dispatch(openLoginModal());
        }
        else{
            likes.push('') // push the user id
        }
    }

    console.log("story: ",story);

    return (
        <div className={styles.wholeCont}>
            <div className={styles.toolBox}>
                <div className={styles.likeCont} onClick={likeHandler}>
                    <img src={story.likes?.includes(userName) ? '/likedIcon.png' : '/likeIcon.png'} className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{story.likes?.length}</p>
                </div>
                <div className={styles.likeCont} onClick={commentsHandler}>
                    <img src='/commentIcon.png' className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{story.comments?.length}</p>
                </div>
                <div className={styles.likeCont} onClick={bookmarkHandler}>
                    <img src='/bookmarkIcon.png' className={styles.likeIcon}/>
                    {/* <p className={styles.numberOfLikes}>{story.likes}</p> */}
                </div>
                <div className={styles.likeCont}>
                    <img src='/likeIcon.png' className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{story.likes?.length}</p>
                </div>
            </div>
            <div className={styles.cont}>
                <h1 className={styles.title}>{story.title}</h1>
                <Link className={styles.writtenByCont} href={`/profile/${story.writerId}`}>
                    <img src={story.titleImg === '' ? '/loginIcon.png' : '/loginIcon.png'} 
                        className={styles.writerAvatar} 
                    />
                    <p className={styles.writtenBy}>{story.writerId}</p>
                </Link>
                <div className={styles.imageCont}>
                    <img src={story.titleImg} alt='Title Image' className={styles.titleImg}/>
                </div>
            
                <p className={styles.paras}>{story.paras}</p>
            </div>
            {story.writerId === userName && <button className={styles.updateBtn} >Update</button> }
        </div>
    )
}