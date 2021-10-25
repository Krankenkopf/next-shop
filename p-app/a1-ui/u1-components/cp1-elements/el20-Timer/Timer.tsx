import { useState, useEffect } from "react";

export const Timer = () => {
    const countDownDate = new Date("Dec 1, 2021 00:00:00").getTime()
    const now = new Date().getTime()
    const [distance, setDistance] = useState(countDownDate - now);
    useEffect(() => {
        let timerId: NodeJS.Timeout
        if (distance !== 0) {
            timerId = setTimeout(() => setDistance(prev => prev - 1000), 1000)
        }
        return () => clearTimeout(timerId)
    }, [distance])

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    return <>{distance !== 0
        ? `${days}:${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
        : "Expired"
        }
    </>   
}