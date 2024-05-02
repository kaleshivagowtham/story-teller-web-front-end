import styles from './styles.module.css';
import { useState, useMemo } from 'react';

export default function TagsSelector({selectedTags,setSelectedTags,trendingTags}) {

    const leftArrow = '<';
    const rightArrow = '>';

    const [selectedTag , setSelectedTag] = useState('');

    const selectedTagRemoveHandler = useMemo(() => {
        var temp = selectedTags;
        temp = temp.filter((item) => {return item!== selectedTag})
        setSelectedTags([...temp]);
    },[selectedTag])

    const selectTagAddHandler = (eachTag) => {
        const temp = selectedTags;
        setSelectedTags([...temp,eachTag]);
    }

    return (
        <div className={styles.wholeCont}>
            <div className={styles.tagsCont}>
                <div className={styles.arrowsCont}>
                    <p className={styles.arrows}>{leftArrow}</p>
                </div>
                <div className={styles.tagsInnerCont}>
                    {trendingTags.map((eachTag) => {
                            return (
                                <div key={eachTag} className={styles.eachTagCont} onClick={e => selectTagAddHandler(eachTag)}
                                    style={{display:selectedTags.includes(eachTag) ? 'none' : 'flex'}}>
                                    <p className={styles.eachTag}>{eachTag}</p>
                                </div>
                    )})}
                </div>
                <div className={styles.arrowsCont}>
                    <p className={styles.arrows}>{rightArrow}</p>
                </div>
            </div>
            {selectedTags.length !== 0 &&
                <div className={styles.selectedTagsCont}>
                {selectedTags.map((eachSelectedTag) => {
                    return <div key={eachSelectedTag} className={styles.eachTagCont}
                        onClick={e => setSelectedTag(eachSelectedTag)}>
                        <img src='/crossIcon.png' className={styles.crossImg} />
                        <p className={styles.eachTag}>{eachSelectedTag}</p>
                    </div>
                })}
                </div>
            }
        </div>
    )
}