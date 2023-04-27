import React, { useEffect, useState } from 'react'

const debounceHook = (value, timeout, callback) => {
    const [timer, setTimer] = useState(null)

    const clearTimer = () => {
        if (timer)
            clearTimeout(timer)
    }
    useEffect(() => {
        clearTimer();
        if (value && callback) {
            const newTimer = setTimeout(callback, timeout);
            setTimer(newTimer)
        }
    }, [value])
}

export default debounceHook