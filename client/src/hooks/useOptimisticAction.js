import { useCallback, useRef } from "react";

export const useOptimisticAction = () => {
    const inFlightRef = useRef(new Set());

    return useCallback(async (key, apply, request, revert) => {
        if (inFlightRef.current.has(key)) return false;

        inFlightRef.current.add(key);
        apply();

        try {
            await request();
            return true;
        } catch (error) {
            revert();
            throw error;
        } finally {
            inFlightRef.current.delete(key);
        }
    }, []);
};

export const toggleLikedState = (item, likedKey = "isLiked", countKey = "likes") => {
    const isLiked = !item[likedKey];
    const currentCount = item[countKey] || 0;

    return {
        ...item,
        [likedKey]: isLiked,
        [countKey]: Math.max(0, currentCount + (isLiked ? 1 : -1)),
    };
};
