import { useState,useEffect, useRef, useMemo } from 'react';
import styles from './styles.module.css';
import Head from 'next/head';
import {useDispatch , useSelector} from 'react-redux';
import { openLoginModal } from '../../features/modal/loginModalSlice';
import { redirect } from 'next/dist/server/api-utils';
import {routes} from '../../utils/routes';
import axios from 'axios';
import NotificationComponent from '../NotificationComponent';
import MiniLoadingComponent from '../MiniLoadingComponent';
import useLocalStorage from '../../utils/useLocalStorage';
import { useRouter } from 'next/router';
import { storage } from '../../utils/firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export default function WriteEachChapter({chapterNumber, storyTitle}) {

    const router = useRouter();
    const paraText = useRef();
    const tagsInputRef = useRef();
    const ingredientInputRef = useRef();

    const storyAddURL = `${routes.baseUrl}${routes.api.addStory}`;

    const dispatch = useDispatch();

    const {isLoggedIn, userName} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal);

    useEffect(() => {
        if(isLoggedIn === false)
        {
            setInterval(() => {
                dispatch(openLoginModal());
            },50);
        }
    },[isLoginModalOpen]);

    useEffect(() => {
        const temp = newChapter;
        newChapter.writerId = userName;
        setNewChapter(temp);
    },[userName]);

    const [newChapter , setNewChapter] = useState({'writerId' : userName,
                                            'storyTitle' : storyTitle,
                                             'title' : '',
                                             'paras' : [{type : 'text', content: 'abc'},
                                                        {type : 'image', content: 'image'}],
                                             'titleImg' : '',
                                             'likes' : [],
                                            });
    const [dragging, setDragging] = useState(null);
    const [currFocus, setCurrFocus] = useState(null);
    const [posted , setPosted] = useState(false);
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     if(paraText !== null && paraText.current !== null && paraText.current.style !== null)
    //         paraText.current.style.height = paraText?.current.scrollHeight+"px";
    // },[newStory.paras])

    const dragStartHandler = (index) => {
        setDragging(index);
    }

    const dragOverHandler = (index) => {
        const draggingItem = newChapter.paras[dragging];
        console.log(index+1, dragging);
        if(draggingItem === null || dragging === index)
            return;

        const temp = {...newChapter};
        temp.paras.splice(index, 0, draggingItem);
        setNewChapter(temp);
        setDragging(index);
    }

    const dragEndHandler = () => {
        setDragging(null);
    }

    const titleHandler = (e) => {
        const temp = {...newChapter};
        temp.title = e.target.value;
        setNewChapter(temp);
    }

    const imageHandler = (e, index) => {
        console.log(index);
        const temp = {...newChapter};
        temp.paras[index].content = e.target.files[0];
        setNewChapter(temp);
    }

    const paraWriter = (e, index) => {
        const temp = {...newChapter};
        temp.paras[index].content = e.target.value;
        setNewChapter(temp);
    }

    useEffect(() => {
        if(posted !== false)
            router.push(`/${posted.replace(/ /g, '-')}/chapter/${chapterNumber}`);
    },[posted])

    const submitHandler = async (e) => {

        if(isLoggedIn === false)
            dispatch(openLoginModal());
        if(newChapter.title === '') {
            alert("Title missing")
            return;
        }
        if(newChapter.paras.length === 0) {
            alert("Paras missing");
            return;
        }
        if(newChapter.paras.length !== 0) {
            await Promise.all (
                newChapter?.paras?.map ((element, index) => {
                    if(element.type === 'image') {
                        const storageRef = ref(storage, `/each-story-images/${storyTitle?.replace(/-/g, ' ') + '/' + chapterNumber}/${element?.content.name}`);
                        console.log(storageRef);
                        const uploadTask = uploadBytesResumable(storageRef, element?.content);
                        uploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                const percent = Math.round(
                                    (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
                                );
                                setPercent(percent);
                            },
                            (err) => {
                                console.log("firebase file upload error: ",err.message);
                                alert("The image has not been uploaded");
                                return;
                            },
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref)
                                .then(url => {
                                    const temp = newChapter;
                                    temp.paras[index].content = url;
                                    setNewChapter(temp);
                                })
                            }
                        )
                    }
                })
            )

            await axios.post( storyAddURL , {
                newStory : newChapter,
                token : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
            })
            .then( resp => {
                if(resp.data.message === 'Story saved')
                {
                    console.log("Story Saved");
                    setPosted(newChapter.title);
                }
                else {
                    if(resp.data.message === 'No Title!')
                        alert("Pleas enter a title")
                    else if(resp.data.message === 'No Content!')
                        alert("No Content!")
                    else if(resp.data.message === 'Title already exists')
                        alert("Title already exists");
                }
                setIsLoading(false)
            })
            .catch(err => console.log(err));
        }
    }

    const addImgHandler = (index) => {
        const temp = {...newChapter};
        temp.paras.splice(index+1, 0, {'type' : 'image', 'content' : ''});
        setNewChapter(temp);
    }

    const addParaHandler = (index) => {
        console.log("CALLED ADD PARA");
        const temp = {...newChapter};
        temp.paras.splice(index+1, 0, {'type' : 'text', 'content' : ''});
        setNewChapter(temp);
    }

    const deleteParaHandler = async (index) => {
        let temp = {...newChapter};
        await Promise.all (
            temp.paras = temp?.paras?.filter((element, i) => {
                return i !== index;
            })
        )
        setNewChapter(temp);
    }

    return (
        <div className={styles.wholeCont} onClick={e => setCurrFocus(null)}>
            <Head>
                <title>New Episode</title>
                <link rel="profile image" href="/favicon.ico" />
                <meta charset="UTF-8" />
                <meta name="description" content="Web developer portfolio website"/>
                <meta name="keywords" content="food, recipe, foodgods, cusine, indian, italian, chineses, food, recipes"/>
                <meta name="author" content="Shiva Gowtham Kale"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            {/* {posted && <NotificationComponent message='The story has been saved' />} */}
            <div className={styles.addLastParaBtnCont}>
                <div className={styles.addLastParaBtn} onClick={e => addParaHandler(newChapter.paras.length)}>Add Para</div>
                <div className={styles.addLastParaBtn} 
                    onClick={e => addImgHandler(newChapter.paras.length)}
                    style={{top:'65%'}}
                >
                    Add Image
                </div>
            </div>
            <div className={styles.cont}>
                <div className={styles.numberOfParasCont}>
                    <p className={styles.numberOfParas}>Paras : {newChapter?.paras?.length}</p>
                </div>
                <div className={styles.titleCont} onClick={e => {e.stopPropagation(),setCurrFocus('title')}}>
                {
                    currFocus === 'title' || newChapter.title === ''
                    ?
                        <textarea placeholder='New Chapter Title' className={styles.titleInput} 
                            onChange={e => titleHandler(e)} value={newChapter.title}
                        />
                    :
                        <h1 className={styles.title}>{newChapter.title}</h1>
                }
                </div>
                {
                    newChapter?.paras?.map((eachPara, index) => {
                        return (
                            <div key={index} className={styles.eachParaCont} 
                                draggable = {true}
                            >
                                <div className={styles.eachParaBtnCont}>
                                    <img className={styles.eachParaBtn} src='/grabbingIcon.png'
                                        onClick={e => addParaHandler(index)}
                                        onDragStart={e => dragStartHandler(index)}
                                        // onDragOver={e => dragOverHandler(index)}
                                        onDragEnd={e => dragOverHandler(index)}
                                    />
                                    <img className={styles.eachParaBtn} src='/addParaIcon.png'
                                        onClick={e => addParaHandler(index)}
                                    />
                                    <img className={styles.eachParaBtn} src='/addImgIcon.png'
                                        onClick={e => addImgHandler(index)}
                                    />
                                    <img className={styles.eachParaBtn} src='/crossIcon.png'
                                        onClick={e => deleteParaHandler(index)}
                                    />
                                </div>
                            { 
                                eachPara.type === 'text'
                            ?
                                (
                                    currFocus === index || newChapter.paras[index].content === ''
                                    ?
                                        <textarea onChange={e => paraWriter(e, index)} name={index} onClick={e => {e.stopPropagation(),setCurrFocus(index)}}
                                            placeholder='Story description...' value={eachPara.content} ref={paraText}
                                            // style={{height : `${paraText.current.scrollHeight+"px"}`}}
                                            className={`${styles.paraTextArea} ${newChapter.paras.length === 0 || currFocus === index  ? styles.paraTextAreaFocus : ''}`}
                                        />
                                    :
                                        <p className={styles.paras} 
                                            onClick={e => {e.stopPropagation(), setCurrFocus(index)}}
                                        >
                                            {eachPara.content}
                                        </p>
                                )
                            :
                                (
                                    newChapter.paras[index].content !== ''
                                    ?
                                    <div className={`${styles.imageCont} ${newChapter.titleImg ? styles.imageContUploaded : ''}`}>
                                        <img src={typeof newChapter.paras[index].content === 'string' ? newChapter.paras[index].content : URL.createObjectURL(newChapter.paras[index].content)} alt='Title Image' className={styles.titleImg}/>
                                        <label className={styles.imageChangeCont} onChange={e => imageHandler(e, index)}>
                                            <input type='file' accept='image.jpeg, image/png' className={styles.uploadChangeInput} />
                                            <img src='/cameraIcon.png' alt='camera icon' className={styles.uploadChangeImg}/>
                                        </label>
                                    </div>
                                    :
                                    <label className={styles.imageCont} onChange={e => imageHandler(e, index)}>
                                        <input type='file' accept='image.jpeg, image/png' className={styles.uploadInput} />
                                        <button className={styles.uploadBtn}>Upload Image</button>
                                    </label>
                                )
                            }
                            </div>
                        )
                    })
                }
                <button 
                    className={`${styles.submitBtn} ${newChapter.title === '' || newChapter.paras.length === 0 ? styles.submitBtnInvalid : ''}`} 
                    onClick = {e => {setIsLoading(true),submitHandler(e)}}
                    disabled = {newChapter.title === '' || newChapter.paras.length === 0 ? true : false}
                >
                    Submit
                    <span>
                        {isLoading && <MiniLoadingComponent />}
                    </span>
                </button>

                <button 
                    className={`${styles.submitBtn} ${newChapter.title === '' || newChapter.paras.length === 0 ? styles.submitBtnInvalid : ''}`} 
                    onClick = {e => {setIsLoading(true),submitHandler(e)}}
                    disabled = {newChapter.title === '' || newChapter.paras.length === 0 ? true : false}
                >
                    Update
                    <span>
                        {isLoading && <MiniLoadingComponent />}
                    </span>
                </button>
            </div>
        </div>
    )
}