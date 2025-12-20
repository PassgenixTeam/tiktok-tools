import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SLICE_KEY = "tiktokProfiles";

export type TiktokProfile = {
    username: string;
    name?: string;
    avatarUrl?: string;
}

let initialState = {
    availableProfiles: [] as TiktokProfile[],
    currentProfile: null as TiktokProfile | null,
};

const savedState = localStorage.getItem(SLICE_KEY);
if (savedState) {
    try {
        const savedStateParsed = JSON.parse(savedState);
        initialState = savedStateParsed;
    } catch (error) {
        console.error('Failed to load profiles from localStorage:', error);
        localStorage.removeItem(SLICE_KEY);
    }
}

const tiktokProfilesSlice = createSlice({
    name: SLICE_KEY,
    initialState: initialState,
    reducers: {
        addProfile(state, action: PayloadAction<TiktokProfile>) {
            state.availableProfiles.push(action.payload);
            state.currentProfile = action.payload;
        },
        removeProfile(state, action: PayloadAction<string>) {
            state.availableProfiles = state.availableProfiles.filter(
                (profile) => profile.username !== action.payload
            );

            if (state.currentProfile?.username === action.payload) {
                state.currentProfile = null;
            }
        },
        chooseProfile(state, action: PayloadAction<string>) {
            const profile = state.availableProfiles.find(
                (p) => p.username === action.payload
            );
            if (profile) {
                state.currentProfile = profile;
            }
        }
    },

});

export const { addProfile, removeProfile, chooseProfile } = tiktokProfilesSlice.actions;
export const tiktokProfilesReducer = tiktokProfilesSlice.reducer;
export const tiktokProfilesSliceKey = tiktokProfilesSlice.name;
