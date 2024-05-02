import { useMemo, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import StoryComponent from '../../../src/components/StoryComponent';

export default function Story() {

    const router = useRouter();
    const [storyTitle, setStoryTitle] = useState('');

    const changeUrl = useMemo (() => {
        setStoryTitle(router.query.storyTitle);
    },[router.query.storyTitle])

    return (
        <div className={styles.wholeCont}>
            <StoryComponent storyTitle={storyTitle}/>
        </div>
    )
}