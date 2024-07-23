import { useMemo, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
// import StoryComponent from '../../../src/components/StoryComponent';
import NovelComponent from '../../../src/components/NovelComponent';

export default function Story() {

    const router = useRouter();
    const [storyTitle, setStoryTitle] = useState('');

    const changeUrl = useMemo (() => {
        if(router.query.storyTitle)
            setStoryTitle(router.query.storyTitle.replace(/ /g,'-'));
    },[router.query.storyTitle])

    return (
        <div className={styles.wholeCont}>
            {/* <StoryComponent storyTitle={storyTitle}/> */}
            <NovelComponent storyTitle={storyTitle} />
        </div>
    )
}