import { useState,useEffect } from 'react';
import styles from './styles.module.css';
import {useDispatch , useSelector} from 'react-redux';
import { openLoginModal } from '../../features/modal/loginModalSlice';
import { openNotification} from '../../features/modal/notificationSlice';
import NotificationComponent from '../NotificationComponent';

export default function WriteBlogComponent() {

    const storyPostUrl = 'http://localhost:5000/newstory';

    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal)
    const {userName} = useSelector(store => store.loggedIn);

    // useEffect(() => {
    //     if(isLoggedIn === false)
    //     {
    //         setTimeout(() => {
    //             dispatch(openLoginModal());
    //         },50);
    //     }
    // },[isLoginModalOpen]);

    useEffect(() => {
        const temp = newStory;
        newStory.writerId = userName;
        setNewStory(temp);
    },[userName]);
    

    const [title , setTitle] = useState('');
    const [titleImg , setTitleImg] = useState();
    const [paras , setParas] = useState(['']);

    const [newStory , setNewStory] = useState({'writerId' : '',
                                             'title' : '',
                                             'paras' : [''],
                                             'titleImg' : ''});

    const [posted , setPosted] = useState(false);


    console.log(paras.length);
    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    const imageHandler = (e) => {

    }

    const addParaHandler = (e) => {
        // const demiParas = [...paras];
        // demiParas.concat('');
        // setParas([...demiParas,'']);
        setParas([...paras , '']);
        // while(paras.length())
        console.log(paras);
    }

    const removeParaHandler = (e) => {
        const demiParas = paras.slice(0,-1);
        setParas([...demiParas]);
        console.log(paras);
    }

    const paraWriter = (e , i) => {
        const temp = paras;
        temp[i] = e.target.value;
        setParas(temp);
        console.log(paras);
    }

    const submitHandler = async (e) => {
        const response = await fetch( storyPostUrl , {
            method : 'POST',
            body : JSON.stringify({
                newStory : newStory
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then( JSON => {
            if(JSON === 'No Title!')
            {
                console.log("Pleas enter a title")
            }
            if(JSON === 'No Content!')
            {
                console.log("No Content!")
            }
            if(JSON === 'Title already exists')
            {
                console.log("Title already exists");
            }
            if(JSON === 'The story has been saved')
            {
                console.log("Saved");
                dispatch(openNotification("The story has been saved"));
                setPosted(true);
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <div className={styles.wholeCont}>
            {/* <div className={styles.leftCont}>
            </div> */}
            {posted && <NotificationComponent message='The story has been saved' />}
            <div className={styles.cont}>
                <div className={styles.numberOfParasCont}>
                    <p className={styles.numberOfParas}>Paras : {paras.length}</p>
                </div>
                <div className={styles.titleCont}>
                    <input placeholder='Enter the title here' className={styles.titleInput} onChange={e => titleHandler(e)}/>
                </div>
                {
                    titleImg
                    ?
                    <div className={styles.imageCont}>
                        <img src={'/homePageBackground.jpeg'} alt='Title Image' className={styles.titleImg}/>
                    </div>
                    :
                    <label className={styles.imageCont} onChange={e => imageHandler(e)}>
                        <input type='file' className={styles.uploadInput} />
                        <button className={styles.uploadBtn}>Upload Image</button>
                    </label>
                }
                <div className={styles.parasCont}>
                {
                    paras.map( (item , index) => {
                        return (
                            <div key={item} className={styles.eachPara}>
                                <textarea onChange={e => paraWriter(e , index)}  className={styles.eachParaText}/>
                            </div>
                        )
                    })
                }
                    <div className={styles.paraBtnsCont}>
                        <img src='/addParaIcon.png' alt='Add para' className={styles.addParaBtn} 
                        onClick={e => addParaHandler()}
                        />
                        <img src='/subParaIcon.png' alt='remove para' className={styles.removeParaBtn} 
                            onClick={e => removeParaHandler()}
                        />
                    </div>
                </div>
                <button className={styles.submitBtn} onClick={e => submitHandler(e)}>Submit</button>
            </div>
        </div>
    )
}