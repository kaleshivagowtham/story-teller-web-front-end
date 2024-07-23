import { useEffect,useState,useMemo , useRef } from 'react';
import styles from './styles.module.css';

export default function TitleSliderComponent({trending}) {

    const timerRef = useRef(null);
    const currImg = useRef(null);

    const leftArrow = '<';
    const rightArrow = '>';

    const [currIndex , setCurrIndex] = useState(0);
    const [hoverSlide , setHoverSlide] = useState(false);
    const [slideStyle , setSlideStyle] = useState({});

    const moveRight = () => {
        currIndex == (trending.length - 1) ? setCurrIndex(0) : setCurrIndex(currIndex+1);
    }

    const moveLeft = () => {
        currIndex == 0 ? setCurrIndex(trending.length - 1) : setCurrIndex(currIndex-1);
    }

    
    useEffect(() => {
        timerRef.current ? clearTimeout(timerRef.current) : null;
        timerRef.current = setTimeout(() => {
            moveRight();
        },[5000])
    },[currIndex]);

    useEffect(() => {
        setSlideStyle({
        transform : `translate(${-(100)})%`,
        backgroundImage:`url( ${trending[currIndex]?.titleImg} )`,
        transition : `translate(${-(100)})% ease-out 1s`})
    },[currIndex]);

    const pauseTimer = () => {
        hoverSlide 
        ?
        clearTimeout(timerRef.current)
        :
        null
    }

    // const { naturalWidth, naturalHeight } = currImg.current;
    // console.log(currImg.current.style.backgroundImage);

    return (
        <div className={styles.wholeCont} onMouseEnter={e => pauseTimer()}>
            {/* onMouseLeave={e => setHoverSlide(false)}> */}
            <div className={styles.arrowsCont} style={{left:'2.5vh'}}
                onClick={e => moveLeft()}>
                <p className={styles.arrows}>{leftArrow}</p>
            </div>
            {
                <div className={ styles.titleContSlideIn } ref={currImg}
                    style={slideStyle}
                        // style={{backgroundImage:`url(${trending[currIndex]?.titleImg})`}}                    
                    >
                    <div className={styles.titleInfoCont}>
                        <h3 className={styles.eachTitle}>{trending[currIndex]?.title}</h3>
                        <div className={styles.eachDescCont}>
                            <p className={styles.eachDesc}>{trending[currIndex]?.paras}</p>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.arrowsCont} style={{right:'2.5vh'}}
                onClick={e => moveRight()}>
                <p className={styles.arrows}>{rightArrow}</p>
            </div>
        </div>
    )
}