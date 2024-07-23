import { useRouter } from "next/router"
import { useState, useEffect, useMemo } from "react";
import EachChapterComponent from '../../../../src/components/EachChapterComponent';

export default function Chapter() {

    const router = useRouter();

    const [storyTitle, setStoryTitle] = useState();
    const [chapterNumber, setChapterNumber] = useState()

    const changeUrl = useMemo (() => {
        if(router.query.storyTitle)
            setStoryTitle(router.query.storyTitle?.replace(/-/g,' '));
        setChapterNumber(router.query.chapterNum);
    },[router.query.chapterNum, router.query.storyTitle])

    return (
        <EachChapterComponent storyTitle={storyTitle} chapterNumber={chapterNumber} />
    )
}