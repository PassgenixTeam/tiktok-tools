import { Middleware } from "@reduxjs/toolkit";

export default function createLocalStorageMiddleware(sliceKeys: string[] = []): Middleware {
  return (store) => (next) => (action: any) => {
    const result = next(action);

    // Save to localStorage if the action affects relevant slices
    for (const sliceKey of sliceKeys) {
        if (action.type?.startsWith(`${sliceKey}/`)) {
            const state = store.getState();
            try {
                localStorage.setItem(sliceKey, JSON.stringify(state[sliceKey]));
            } catch (error) {
                console.error('Failed to save profiles to localStorage:', error);
            }
        }
    }

    return result;
  };
}