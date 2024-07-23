import { useState } from 'react';
import styles from './styles.module.css';
import { useDispatch , useSelector } from 'react-redux';
import { routes } from '../../utils/routes';
import axios from 'axios';
import MiniLoadingComponent from '../MiniLoadingComponent';
import useLocalStorage from '../../utils/useLocalStorage';

export default function CommentModal ({setOpenCommentModel, replyTo}) {

    const replyCommentURL = routes.baseUrl + routes.api.replyComment;

    const {userName} = useSelector(store => store.loggedIn)

    const [newComment, setNewComment] = useState('');
    const [commentUploaded, setCommentUploaded] = useState(null);

    const newCommentHandler = (e) => {

        if(e.target.value.length > 200 ){
            console.log(newComment?.length);
            return;
        }

        setNewComment(e.target.value)
    }

    const submitCommentHandler = () => {

        if(commentUploaded === 'processing' || newComment?.length === 0 || newComment?.length > 200)
            return;
        else {
            setCommentUploaded('processing')

            axios.post( replyCommentURL, {
                writerId : userName,
                comment : newComment,
                replyTo
            },{
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
                }
            })
            .then(resp => {
                setCommentUploaded('posted')
                setOpenCommentModel(false)
            })
            .catch(err => {
                console.log("Comment Modal Error",err.message)
            })
        }
    }

    const contClickHandler = (e) => {
        // e.preventDefault();
        if(commentUploaded === 'processing')
            return;

        setOpenCommentModel(false);
    }

    return (
        <div className={styles.commentModelCont}
            onClick={e => contClickHandler(e)}
        >
            <div className={styles.commentModel} 
                onClick={e => e.stopPropagation()}
            >
                <textarea className={`${styles.commentModelInput} ${newComment?.length === 200 ? styles.commentModelInputRed : ''}`} 
                    onChange={e => newCommentHandler(e)}
                    placeholder='comment...'
                    value={newComment}
                />
                <p className={`${styles.commentModelInputLen} ${newComment?.length === 200 ? styles.commentModelInputLenRed : ''}`}>
                    {newComment?.length}/200
                </p>
                <button 
                    className={`${commentUploaded === 'processing' || newComment?.length === 0 || newComment?.length === 200 ? styles.commentModalBtnLoading : styles.commentModelBtn}`} 
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
        </div>
    )
}