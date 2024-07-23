import { useEffect, useMemo, useState } from "react";
import styles from './styles.module.css';
import axios from "axios";
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useSelector, useDispatch} from 'react-redux';
import { closeLoginModal, openLoginModal } from "../../features/modal/loginModalSlice";
import { routes } from "../../utils/routes";
import EachCommentComponent from "../EachCommentComponent";
import CommentModal from "../CommentModal";
import MiniLoadingComponent from '../MiniLoadingComponent';
import useLocalStorage from "../../utils/useLocalStorage";

export default function NovelComponent({storyTitle}) {

    const baseUrl = routes.baseUrl + routes.api.getStory;
    const likeUrl = routes.baseUrl + routes.api.checkLiked;
    const commentUrl = routes.baseUrl + routes.api.checkComment;
    const newCommentURL = routes.baseUrl + routes.api.newComment
    console.log(newCommentURL)

    const router = useRouter();

    const dispatch = useDispatch();

    const {isLoggedIn, userName} = useSelector(store => store.loggedIn);


    const [currFocus, setCurrFocus] = useState('');
    const [s,b] = useState();

    // const [novel, setNovel] = useState({'writerId' : 'shivakale123',
    //                                     'title' : 'The Legends of the legendary legend',
    //                                    'paras' : '',
    //                                     'titleImg' : '/homePageBackground.jpeg',
    //                                     'chapters' : [{'chapterTitle' : 'ABC 1'}, {'chapterTitle' : 'ABC 2'}, {'chapterTitle' : 'ABC 3'}, {'chapterTitle' : 'ABC 4'}, {'chapterTitle' : 'ABC 5'}, {'chapterTitle' : 'ABC 6'}],
    //                                     'likes' : ['a','b','c'],
    //                                     'comments' : [
    //                                         {
    //                                             'commentBy':'shivakale123',
    //                                             'comment' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem ',
    //                                             'date':'',
    //                                             'time' : '',
    //                                             'reply' : [{
    //                                                 'commentBy':'shivakale123',
    //                                                 'comment' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem ',
    //                                                 'date':'',
    //                                                 'time' : '',
    //                                                 'reply' : [{
    //                                                     'commentBy':'shivakale123',
    //                                                     'comment' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem ',
    //                                                     'date':'',
    //                                                     'time' : '',
    //                                                     'reply' : []
    //                                                 }]
    //                                             },
    //                                             {
    //                                                 'commentBy':'shivakale123',
    //                                                 'comment' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem ',
    //                                                 'date':'',
    //                                                 'time' : '',
    //                                                 'reply' : []
    //                                             }]
    //                                         }
    //                                     ]});
    //                                     //             {'commentBy':'b', 'comment' : '','date' : '','time' : '', 'reply' : ''},
    //                                     //             {'commentBy':'c', 'comment' : '', 'date' : '','time' : '', 'reply' : ''}]
    //                                     // });
    const [novel, setNovel] = useState();
    const [chapterSearchText, setChapterSearchText] = useState();
    const [newComment, setNewComment] = useState('');
    const [openCommentModel, setOpenCommentModel] = useState(false);
    const [commentUploaded, setCommentUploaded] = useState(null);
    const [replyTo, setReplyTo] = useState();

    useEffect(() => {
        if(storyTitle === undefined)
            return;
        axios.post(baseUrl , {
            storyTitle : storyTitle?.replace(/-/g, ' ')
        })
        .then(res => {
            setNovel({...res.data.story, avatar : res.data.avatar});
        })
        .catch(err => {
            console.log("Error: ",err.message)
        })
    },[storyTitle])

    console.log("now:", novel)

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
                    setNovel(res.data.content);
                }
                else
                    console.log("already liked");
            })
            .catch(err => {
                console.log("Error: ",err.message)
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
                    novel?.comments.push(userName);
                else
                    console.log("already liked")
            })
            .catch(err => {
                console.log("Error: ",err.message)
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

    const newCommentHandler = (e) => {

        if(e.target.value.length > 200 )
            return;

        setNewComment(e.target.value)
    }

    const submitCommentHandler = () => {

        if(commentUploaded === 'processing' || newComment.length === 0)
            return;
        else {
            setCommentUploaded('processing');

            axios.post(newCommentURL, {
                newComment,
                storyTitle : storyTitle.replace(/-/g, ' ')
            },
            {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
                }
            })
            .then(resp => {
                setCommentUploaded('posted');
                // console.log("comment posted")
            })
            .catch(err => {
                console.log('Comment Error: ', err.message)
            })
        }
    }

    // console.log("story: ",novel);

    return (
        <div className={styles.wholeCont}>
            <div className={styles.toolBox}>
                <div className={styles.likeCont} onClick={likeHandler}>
                    <img src={novel?.likes?.includes(userName) ? '/likedIcon.png' : '/likeIcon.png'} className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{novel?.likes?.length}</p>
                </div>
                <div className={styles.likeCont} onClick={commentsHandler}>
                    <img src='/commentIcon.png' className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{novel?.comments?.length}</p>
                </div>
                <div className={styles.likeCont} onClick={bookmarkHandler}>
                    <img src='/bookmarkIcon.png' className={styles.likeIcon}/>
                    {/* <p className={styles.numberOfLikes}>{story.likes}</p> */}
                </div>
                <div className={styles.likeCont}>
                    <img src='/likeIcon.png' className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{novel?.likes?.length}</p>
                </div>
            </div>

            <div className={styles.cont}>
                <div className={styles.topCont}>
                    <div className={styles.topLeftCont}>
                        <img className={styles.topLeftImg}
                            src={novel?.titleImg}
                            alt='Novel Title Image'
                        />
                    </div>
                    <div className={styles.topRightCont}>
                        <p className={styles.novelStatus}>Ongoing</p>
                        <h1 className={styles.novelTitle}>{novel?.title}</h1>
                        <Link href={'/profile/' + novel?.writerId}
                            className={styles.novelWriterCont}
                        >
                            <img src={novel?.avatar} className={styles.novelWriterDp} />
                            <p className={styles.novelWriterID}>{novel?.writerId}</p>    
                        </Link>
                        <p className={styles.novelDesc}>{novel?.paras}</p>
                        <div className={styles.topRightBottomCont}>
                            <Link className={styles.topRightBottomBtn}
                                href={'/novel/' + storyTitle + '/chapter/1'}
                            >
                                {`Start Reading >`}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomCont}>
                    <div className={styles.bottomTopCont}>
                        <input className={styles.bottomSearchCont} 
                            placeholder="Chapter number..."
                            onChange={e => {setChapterSearchText(e.target.value)}}
                        />
                        <img className={styles.bottomSearchImg}
                            src='/searchIcon.png'
                        />
                    </div>
                    {
                        novel?.chapters?.filter((eachChapter, index) => {
                            if(chapterSearchText)
                                return index + 1 == chapterSearchText;
                            else
                                return eachChapter;
                        })?.map((eachChapter, index) => {

                            return (
                                <Link key={eachChapter}
                                    href={'/novel/'+ storyTitle + '/chapter/' + (index+1)}
                                    className={styles.eachChapterCont}
                                >
                                    {eachChapter.chapterTitle}
                                </Link>
                            )
                        })
                    }
                </div>
                <div className={styles.commentsCont}>
                    <p className={styles.novelTitle}>Comments</p>
                    <div className={styles.addCommentsCont}>
                        <textarea className={`${styles.commentModelInput} ${newComment.length === 200 ? styles.commentModelInputRed : ''}`} 
                            onChange={e => newCommentHandler(e)}
                            placeholder='comment...'
                            value={newComment}
                        />
                        <p className={`${styles.commentModelInputLen} ${newComment.length === 200 ? styles.commentModelInputLenRed : ''}`}>
                            {newComment.length}/200
                        </p>
                        <button className={`${commentUploaded !== 'processing' && newComment.length ? styles.submitButton : styles.submitButtonLoading}`} 
                            onClick={e => submitCommentHandler()} 
                        >
                        {
                            commentUploaded === 'processing'
                            ?
                                <MiniLoadingComponent />
                            :
                            'Submit'
                        }
                        </button>
                    </div>
                    {novel?.comments?.map((eachCommentId) => {
                            {/* console.log(eachCommentId) */}
                        return (
                            <div key={eachCommentId} className={styles.eachCommentCont} >
                                <EachCommentComponent 
                                    commentId={eachCommentId}
                                    openCommentModel={openCommentModel}
                                    setOpenCommentModel={setOpenCommentModel}
                                    replyTo={replyTo}
                                    setReplyTo={setReplyTo}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            {openCommentModel && 
                <CommentModal replyTo={replyTo} setOpenCommentModel={setOpenCommentModel} />
            }
        </div>
    )
}