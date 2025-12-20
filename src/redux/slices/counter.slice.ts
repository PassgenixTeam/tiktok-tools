// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows "mutating" logic in reducers via Immer
            state.value += 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

export const { increment, incrementByAmount } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
