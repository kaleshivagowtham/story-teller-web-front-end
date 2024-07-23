import { useRouter } from "next/router"
import { useState, useMemo } from "react";
import WriteEachChapter from "../../../../src/components/WriteEachChapter";

export default function Chapter() {

    const router = useRouter();

    const [chapterNumber, setChapterNumber] = useState()
    const [storyTitle, setStoryTitle] = useState();

    const changeUrl = useMemo (() => {
        setStoryTitle(router.query.storyTitle);
        setChapterNumber(router.query.chapterNum);
    },[router.query.chapterNum, router.query.storyTitle])

    console.log(storyTitle,chapterNumber);

    return (
        <WriteEachChapter storyTitle={storyTitle} chapterNumber={chapterNumber} />
    )
}