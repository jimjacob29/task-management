import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (handlerFunction, delay) => {
    const timer = useRef(null);
    useEffect(() => {
        return () => {
            if (timer?.current) {
                clearTimeout(timer?.current);
            }
        };
    }, []);
    return useCallback(
        (...props) => {
            if (timer?.current) {
                clearTimeout(timer?.current);
            }
            timer.current = setTimeout(() => {
                handlerFunction(...props);
            }, delay);
        },
        [handlerFunction, delay]
    );
};
