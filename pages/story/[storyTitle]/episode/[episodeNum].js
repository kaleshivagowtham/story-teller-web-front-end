import { useRouter } from "next/router"
import { useState, useMemo, useEffect } from "react";

export default function Episode() {

    const router = useRouter();

    const [episodeNumber, setEpisodeNumber] = useState()

    const changeUrl = useMemo (() => {
        setEpisodeNumber(router.query.episodeNum);
    },[router.query.episodeNum])

    return (
        <div>
            
        </div>
    )
}