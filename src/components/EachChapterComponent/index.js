import { useEffect, useState } from "react";
import  styles from './styles.module.css';
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import {useRouter} from 'next/router';
import {routes} from '../../utils/routes';
import { useSelector } from "react-redux";
import MiniLoadingComponent from "../MiniLoadingComponent";

export default function EachChapterComponent({storyTitle, chapterNumber}) {

    const chapterURL = routes.baseUrl + routes.api.getChapter;

    const router = useRouter();

    const {userName} = useSelector(store => store.loggedIn)

    // const [chapter , setChapter] = useState({'writerId' : 'Shivakale',
    //                                         'storyTitle' : 'storyTitle',
    //                                          'title' : 'ABCD EFGH',
    //                                          'chapterNumber' : 1,
    //                                          'paras' : [{type : 'text', content: 'abc'},
    //                                                     {type : 'image', content: '/homePageBackground.jpeg'},
    //                                                     {type : 'text', content: 'abc'},
    //                                                     {type : 'image', content: '/homePageBackground.jpeg'},
    //                                                     {type : 'text', content: 'abc'},
    //                                                     {type : 'image', content: '/homePageBackground.jpeg'},],
    //                                          'titleImg' : '/homePageBackground.jpeg',
    //                                          'likes' : [],
    //                                         });
    const [chapter , setChapter] = useState()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if(chapterNumber === 0)
            router.replace('/');

        if(storyTitle === undefined || chapterNumber === undefined)
            return;

        console.log('title: ', storyTitle, chapterNumber)

        axios.post(chapterURL, {
            storyTitle,
            chapterNumber
        })
        .then(resp => {
            setChapter({...resp.data?.chapter, avatar: resp.data?.avatar});
            // console.log("chapter: ",resp.data)
        })
        .catch(err => {
            console.log(err.message);
        })
    },[storyTitle, chapterNumber])

    const toNextChapter = () => {
        if(chapter?.chapterNumber == 3)
            return;
        if(document)
            document.location.replace( Number(chapter?.chapterNumber) + 1);
    }

    const toPrevChapter = () => {
        if(chapter?.chapterNumber == 1)
            return;
        if(document)
            document.location.replace( Number(chapter?.chapterNumber) - 1);
    }

    return (
        <div className={styles.wholeCont}>
            <Head>
                <title>{chapter?.title + ': ' + chapter?.storyTitle}</title>
                <link rel="Novels" href="/favicon.ico" />
                <meta charset="UTF-8" />
                <meta name="description" content="Novel"/>
                <meta name="keywords" content={`${chapter?.storyTitle} ${chapter?.title} ${chapter?.chapterNumber}`}/>
                <meta name="author" content="Shiva Gowtham Kale"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div className={styles.cont}>
                <div className={styles.titleCont} >
                    <h1 className={styles.title}>{chapter?.title}</h1>
                </div>
                <div className={styles.writerCont}>
                    <img className={styles.writerDp} 
                        src={chapter?.avatar ? chapter?.avatar : '/loginIcon.png'}
                        alt='Writer Dp' 
                    />
                    <Link className={styles.writerName}
                        href={'/profile/' + chapter?.writerId}
                    >
                        {chapter?.writerId}
                    </Link>
                </div>
                {
                    chapter?.paras?.map((eachPara, index) => {
                        return (
                            <div key={index} className={styles.eachParaCont} >
                            { 
                                eachPara.type === 'text'
                            ?

                                <p className={styles.paras}> {eachPara.content} </p>
                            :
                                <div className={styles.imageCont}>
                                    <img src={chapter?.paras[index].content} alt='Title Image' className={styles.titleImg}/>
                                </div>
                            }
                            </div>
                        )
                    })
                }
                {/* <div className={styles.}> */}

                {/* </div> */}
                {userName === chapter?.writerId && 
                    <Link className={styles.submitBtn} onClick={e => setIsLoading(true)}
                        href={'/write/' + chapter.storyTitle.replace(/ /g, '-') + '/chapter/' + chapter.chapterNumber}>
                        Update
                        <span>
                            {isLoading && <MiniLoadingComponent />}
                        </span>
                    </Link>
                }
                <div className={styles.btnsCont}>
                    <Link 
                        className={`${styles.btns} ${styles.Prev} ${chapter?.chapterNumber == 1 ? styles.unSelectBtn : ''} `} 
                        // onClick={e => 'return false'}
                        href={'/novel/' + chapter?.storyTitle?.replace(/ /g, '-') + '/chapter/' + (Number(chapter?.chapterNumber) - 1 )+ '/'}
                    >
                        Prev
                    </Link>
                    <Link className={`${styles.btns} ${styles.Next} ${chapter?.nextChapter == null ? styles.unSelectBtn : ''}`}
                        // onClick={e => toNextChapter()}
                        href={'/novel/' + chapter?.storyTitle?.replace(/ /g, '-') + '/chapter/' + (Number(chapter?.chapterNumber) + 1 )+ '/'}
                    >
                        Next
                    </Link>
                </div>
            </div>
        </div>
    )
}