import { configureStore } from "@reduxjs/toolkit";

import funFactReducer from "./slices/factSlice";

export default configureStore({
  reducer: {
    funFact: funFactReducer,
  },
});
