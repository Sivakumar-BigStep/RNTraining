import { createSlice } from "@reduxjs/toolkit";

export const funFactSlice = createSlice({
  name: "funFact",
  initialState: {
    facts: [],
  },
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
  },
});

// Action creators are generated for each case reducer function
export const { likeFact, dislikeFact, addFact } = funFactSlice.actions;

export default funFactSlice.reducer;
