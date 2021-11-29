import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nft: [],
  titleInput: "",
  allTags: [],
  selectedOption: [],
  singleNft: "",
};

const nft = createSlice({
  name: "nft",
  initialState,
  reducers: {
    getNft: (state, action) => {
      state.nft = action.payload;
    },
    setTitleInput: (state, action) => {
      state.titleInput = action.payload;
    },
    setAllTags: (state, action) => {
      state.allTags = action.payload;
    },
    getselectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    setSingleNft: (state, action) => {
      state.singleNft = action.payload;
    },
  },
});

export const { getNft, setTitleInput, setAllTags, getselectedOption, setSingleNft } = nft.actions;

export default nft.reducer;
