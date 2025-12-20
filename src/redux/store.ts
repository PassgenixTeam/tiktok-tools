import {
    tiktokProfilesReducer,
    tiktokProfilesSliceKey,
} from "@/components/tiktok-profiles/redux/tiktok-profiles.slice";
import {
    partnerProfilesReducer,
    partnerProfilesSliceKey,
} from "@/pages/partner-statistics/components/partner-profiles/redux/partner-profiles.slice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, TypedUseSelectorHook, useSelector } from "react-redux";
import createLocalStorageMiddleware from "./middlewares/local-storage.middleware";

export const store = configureStore({
    reducer: {
        [tiktokProfilesSliceKey]: tiktokProfilesReducer,
        [partnerProfilesSliceKey]: partnerProfilesReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(
            createLocalStorageMiddleware([tiktokProfilesSliceKey, partnerProfilesSliceKey]),
        );
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector<RootState>;
export const useAppDispatch = () => store.dispatch;

export const ReduxProvider = Provider;
