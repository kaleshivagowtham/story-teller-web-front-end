import { useState,useEffect, useRef, useMemo } from 'react';
import styles from './styles.module.css';
import Head from 'next/head';
import {useDispatch , useSelector} from 'react-redux';
import { openLoginModal } from '../../features/modal/loginModalSlice';
import { redirect } from 'next/dist/server/api-utils';
import {routes} from '../../utils/routes';
import axios from 'axios';
import NotificationComponent from '../NotificationComponent';
import useLocalStorage from '../../utils/useLocalStorage';
import { useRouter } from 'next/router';
import { storage } from '../../utils/firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export default function WriteNewNovelComponent() {

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
            setTimeout(() => {
                dispatch(openLoginModal());
            },50);
        }
    },[isLoginModalOpen]);

    useEffect(() => {
        const temp = newStory;
        newStory.writerId = userName;
        setNewStory(temp);
    },[userName]);

    const [newStory , setNewStory] = useState({'writerId' : userName,
                                             'title' : '',
                                             'paras' : '',
                                             'titleImg' : '',
                                             'tags' : [],
                                             'likes' : [],
                                            });
    const [currFocus, setCurrFocus] = useState(0);
    const [posted , setPosted] = useState(false);
    const [currTag, setCurrTag] = useState('');
    const [currIngredient, setCurrIngredient] = useState('');
    const [percent, setPercent] = useState(0);

    console.log(newStory.titleImg);

    useEffect(() => {
        if(paraText !== null && paraText.current !== null && paraText.current.style !== null)
            paraText.current.style.height = paraText?.current.scrollHeight+"px";
    },[newStory.paras])


    const titleHandler = (e) => {
        const temp = {...newStory};
        temp.title = e.target.value;
        setNewStory(temp);
    }

    const imageHandler = (e) => {
        const temp = {...newStory};
        temp.titleImg = e.target.files[0];
        setNewStory(temp);
    }

    const paraWriter = (e) => {
        const temp = {...newStory};
        temp.paras = e.target.value;
        setNewStory(temp);
    }

    useEffect(() => {
        if(posted !== false)
            router.push(`/story/${posted.replace(/ /g, '-')}`);
    },[posted])

    const submitHandler = async (e) => {
        if(isLoggedIn === false)
            dispatch(openLoginModal());
        else if(newStory.title === '') {
            console.log("Title missing")
        }
        else if(newStory.paras === '') {
            console.log("Paras missing");
        }
        else {
            if(newStory.titleImg) {
                const storageRef = ref(storage, `/blogs-images/${newStory.titleImg.name}`);
                const uploadTask = uploadBytesResumable(storageRef, newStory.titleImg);
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
                            const temp = newStory;
                            temp.titleImg = url;
                            setNewStory(temp);
                        })
                        .then(() => {
                            axios.post( storyAddURL , {
                            newStory : newStory,
                            token : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
                            })
                            .then( resp => {
                                if(resp.data.message === 'Story saved')
                                {
                                    console.log("Story Saved");
                                    setPosted(newStory.title);
                                }
                                else {
                                    if(resp.data.message === 'No Title!')
                                        alert("Pleas enter a title")
                                    else if(resp.data.message === 'No Content!')
                                        alert("No Content!")
                                    else if(resp.data.message === 'Title already exists')
                                        alert("Title already exists");
                                }
                            })
                            .catch(err => console.log(err));
                        });
                    }
                )
            }
        }
    }

    const tagsClickHandler = (e) => {
        e.stopPropagation();

    }

    const tagsContClickHandler = (e) => {
        e.stopPropagation();
        setCurrFocus('tags');
        tagsInputRef.current.focus();
    }

    const tagsInputEnterHandler = (e) => {
        if(e.key === 'Enter') {
            if(newStory.tags.includes(currTag)) {
                console.log("Already added");
            }
            else if(newStory.tags.length === 10)
                console.log("Only 10 allowed");
            else {
                const temp = {...newStory};
                temp.tags.push(currTag.toLowerCase());
                setNewStory(temp);
                e.target.value = '';
            }
        }
    }

    const deleteTagHandler = async (tagIndex) => {
        let temp = {...newStory};
        console.log(temp);
        await Promise.all (
            temp.tags = temp?.tags?.filter( (tag, i) => {
                return i != tagIndex;
            })
        )
        setNewStory(temp);
    }

    const ingredientsClickHandler = (e) => {
        e.stopPropagation();
    }

    const ingredientsContClickHandler = (e) => {
        e.stopPropagation();
        setCurrFocus('ingredients');
        ingredientInputRef.current.focus();
    }

    const ingredientsInputEnterHandler = (e) => {
        if(e.key === 'Enter') {
            if(newStory.ingredients.includes(currIngredient)) {
                console.log("Already added");
            }
            else {
                const temp = {...newStory};
                temp.ingredients.push(currIngredient.toLowerCase());
                setNewStory(temp);
                e.target.value = '';
            }
        }
    }

    console.log("TYPE CHECKING: ", typeof newStory.titleImg ,typeof newStory.titleImg === 'string' )

    return(
        <div className={styles.wholeCont} onClick={e => setCurrFocus(null)}>
            <Head>
                <title>New Story</title>
                <link rel="profile image" href="/favicon.ico" />
                <meta charset="UTF-8" />
                <meta name="description" content="Web developer portfolio website"/>
                <meta name="keywords" content="food, recipe, foodgods, cusine, indian, italian, chineses, food, recipes"/>
                <meta name="author" content="Shiva Gowtham Kale"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            {/* <div className={styles.leftCont}>
            </div> */}
            {/* {posted && <NotificationComponent message='The story has been saved' />} */}
            <div className={styles.cont}>
                {/* <div className={styles.numberOfParasCont}>
                    <p className={styles.numberOfParas}>Paras : {paras.length}</p>
                </div> */}
                <div className={styles.titleCont} onClick={e => {e.stopPropagation(),setCurrFocus('title')}}>
                {currFocus === 'title' || newStory.title === ''
                  ?
                    <textarea placeholder='Enter the title here' className={styles.titleInput} 
                        onChange={e => titleHandler(e)} value={newStory.title}
                    />
                  :
                    <h1 className={styles.title}>{newStory.title}</h1>
                }
                </div>
                {
                    newStory.titleImg !== ''
                    ?
                    <div className={`${styles.imageCont} ${newStory.titleImg ? styles.imageContUploaded : ''}`}>
                        <img src={ typeof newStory.titleImg === 'string' ? newStory.titleImg : URL.createObjectURL(newStory.titleImg)} alt='Title Image' className={styles.titleImg}/>
                        <label className={styles.imageChangeCont} onChange={e => imageHandler(e)}>
                            <input type='file' accept='image.jpeg, image/png' className={styles.uploadChangeInput} />
                            <img src='/cameraIcon.png' alt='camera icon' className={styles.uploadChangeImg}/>
                        </label>
                    </div>
                    :
                    <label className={styles.imageCont} onChange={e => imageHandler(e)}>
                        <input type='file' accept='image.jpeg, image/png' className={styles.uploadInput} />
                        <button className={styles.uploadBtn}>Upload Image</button>
                    </label>
                }

                <div className={styles.tagsCont} onClick={tagsContClickHandler}>
                    {
                        newStory.tags?.map((eachTag, i) => {
                            return (
                                <div key={eachTag} className={styles.eachTagCont} onClick={tagsClickHandler}>
                                    <p className={styles.eachTagText}>{eachTag}</p>
                                    <img className={styles.crossImg} onClick={e => deleteTagHandler(i)}
                                        src='/crossIcon.png' alt='close button icon'
                                    />
                                </div>
                            )
                        })
                    }
                    <input className={`${styles.eachTagInput} ${currFocus === 'tags' || newStory.tags.length === 0 ? styles.eachTagInputFocus : ''}`} 
                    ref={tagsInputRef} placeholder="Please click 'Enter' to add tag" id='tags'
                        onChange={e=> setCurrTag(e.target.value)} onKeyDown={tagsInputEnterHandler}
                    />
                </div>
                {/* <div className={styles.tagsCont} onClick={ingredientsContClickHandler}>
                    {
                        newRecipe.ingredients?.map((eachIngredient, i) => {
                            return (
                                <div key={eachIngredient} className={styles.eachTagCont} onClick={ingredientsClickHandler}>
                                    <p className={styles.eachTagText}>{eachIngredient}</p>
                                    <img className={styles.crossImg} onClick={e => deleteTagHandler(e,eachIngredient)}
                                        src='/crossIcon.png' alt='close button icon' 
                                    />
                                </div>
                            )
                        })
                    }
                    <input className={`${styles.eachTagInput} ${currFocus === 'ingredients' || newRecipe.ingredients.length === 0 ? styles.eachTagInputFocus : ''}`} ref={ingredientInputRef}
                        placeholder="Please click 'Enter' to add tag" id='ingredients'
                        onChange={e=> setCurrIngredient(e.target.value)} onKeyDown={ingredientsInputEnterHandler}
                    />
                </div> */}

                {currFocus === 'paragraph' || newStory.paras === ''
                  ?
                    <textarea onChange={e => paraWriter(e)} name='paragraph' onClick={e => {e.stopPropagation(),setCurrFocus('paragraph')}}
                        placeholder='Story description...' value={newStory.paras} ref={paraText}
                        // style={{height : `${paraText.current.scrollHeight+"px"}`}}
                        className={`${styles.paraTextArea} ${newStory.paras === '' || currFocus === 'paragraph'  ? styles.paraTextAreaFocus : ''}`}
                    />
                  :
                  <p className={styles.paras} onClick={e => {e.stopPropagation(), setCurrFocus('paragraph')}}>{newStory.paras}</p>
                }
                <button className={styles.submitBtn} onClick={e => submitHandler(e)}>Submit</button>
            </div>
        </div>
    )
}