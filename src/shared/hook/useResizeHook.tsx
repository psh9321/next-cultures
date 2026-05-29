"use client"

import { useCallback, useSyncExternalStore } from "react";

export const useResizeHook = (size : number) => {

    const Subscribe = useCallback((callback : () => void) => {
        const mediaQuery = window.matchMedia(`(max-width: ${size - 1}px)`);

        mediaQuery.addEventListener("change", callback);

        return () => {
            mediaQuery.removeEventListener("change", callback);
        }
    },[size]);

    const GetSnapshot = useCallback(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${size - 1}px)`);

        return mediaQuery.matches;
    },[size]);

    return useSyncExternalStore(Subscribe, GetSnapshot, () => false);
}
