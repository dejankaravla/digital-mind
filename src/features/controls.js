import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infinite: true,
  selectedOptionControl: false,
  solSea: false,
  verified: false,
  includeNsfw: false,
};

const controls = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setInfinite: (state, action) => {
      state.infinite = action.payload;
    },
    setSelectedOptionControl: (state, action) => {
      state.selectedOptionControl = action.payload;
    },
    setSolSea: (state, action) => {
      state.solSea = action.payload;
    },
    setVerified: (state, action) => {
      state.verified = action.payload;
    },
    setIncludeNsfw: (state, action) => {
      state.includeNsfw = action.payload;
    },
  },
});

export const { setInfinite, setSelectedOptionControl, setSolSea, setVerified, setIncludeNsfw } = controls.actions;

export default controls.reducer;
