import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facts: [],
}

export const funFactSlice = createSlice({
  name: "funFact",
  initialState,
  reducers: {
    likeFact: (state) => {
      return state;
    },
    dislikeFact: (state) => {
      return state;
    },
    addFact: (state, action) => {
      state.facts.push(action.payload);
    },
    resetFunFact: () => initialState
  },
});

// Action creators are generated for each case reducer function
export const { likeFact, dislikeFact, addFact, resetFunFact } = funFactSlice.actions;

export default funFactSlice.reducer;
