import { useState, useEffect } from "react";
import styles from './styles.module.css';
import axios from "axios";
import { routes } from "../../utils/routes";
import Link from "next/link";
import { useSelector } from "react-redux";
import useLocalStorage from "../../utils/useLocalStorage";

export default function EachCommentComponent ({commentId, openCommentModel ,setOpenCommentModel, replyTo, setReplyTo}) {

    const commentURL = routes.baseUrl + routes.api.getComment;
    const deleteCommentUrl = routes.baseUrl + routes.api.deleteComment;

    const { userName } = useSelector(store => store.loggedIn)

    const [replyComment, setReplyComment] = useState();

    useEffect(() => {
        // console.log("Id: ",commentId)
        axios.post( commentURL, {
            commentId
        })
        .then(resp => {
            if(resp.data)
                setReplyComment(resp.data)
            // console.log("data: ",resp.data)
        })
        .catch(err => {
            console.log("CommentRetrieval error: ",err.message)
        })
    },[commentId])

    const deleteCommentHandler = () => {

        axios.post( deleteCommentUrl, {
            commentId
        },
        {
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
            }
        })
        .then(resp => {
            console.log("Comment Deleted")
        })
        .catch(err => {
            console.log("delete comment Error: ", err.message)
        })
    }

    return (
        <div className={styles.wholeCont}>
            <Link className={styles.commentBy}
                href={'/profile/' + replyComment?.commentBy}
            >
                <img className={styles.dp}
                    src={replyComment?.dp ? replyComment.dp : '/loginIcon.png'} 
                />
                {replyComment?.writerId}
            </Link>
            <p className={styles.commentText}>{replyComment?.comment}</p>
            <div className={styles.optionsCont} >
                <p className={styles.options} onClick={e => {setReplyTo(commentId),setOpenCommentModel(true)}}>Reply</p>
                {userName === replyComment?.writerId &&
                    <p className={styles.options} 
                        onClick={e => deleteCommentHandler()}
                    >
                        Delete
                    </p>
                }
            </div>
            {
                replyComment?.reply?.map((eachComment) => {
                    {/* console.log(eachComment) */}
                    return (
                        <div key={eachComment} className={styles.eachCommentCont} >
                            <EachCommentComponent 
                                commentId={eachComment}
                                openCommentModel={openCommentModel}
                                setOpenCommentModel={setOpenCommentModel}
                                replyTo={replyTo}
                                setReplyTo={setReplyTo}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}