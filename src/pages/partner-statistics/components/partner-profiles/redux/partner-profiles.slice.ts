import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SLICE_KEY = "partnerProfiles";

export type PartnerProfile = {
    username: string;
    name?: string;
    avatarUrl?: string;
};

let initialState = {
    availableProfiles: [] as PartnerProfile[],
};

const savedState = localStorage.getItem(SLICE_KEY);
if (savedState) {
    try {
        const savedStateParsed = JSON.parse(savedState);
        initialState = savedStateParsed;
    } catch (error) {
        console.error("Failed to load profiles from localStorage:", error);
        localStorage.removeItem(SLICE_KEY);
    }
}

const partnerProfilesSlice = createSlice({
    name: SLICE_KEY,
    initialState: initialState,
    reducers: {
        addProfile(state, action: PayloadAction<PartnerProfile>) {
            state.availableProfiles.push(action.payload);
        },
        removeProfile(state, action: PayloadAction<string>) {
            state.availableProfiles = state.availableProfiles.filter(
                (profile) => profile.username !== action.payload,
            );
        },
    },
});

export const { addProfile, removeProfile } = partnerProfilesSlice.actions;
export const partnerProfilesReducer = partnerProfilesSlice.reducer;
export const partnerProfilesSliceKey = partnerProfilesSlice.name;
