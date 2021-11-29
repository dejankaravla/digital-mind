import { configureStore } from "@reduxjs/toolkit";
import nftReducer from "../features/nft";
import controlsReducer from "../features/controls";

export const store = configureStore({
  reducer: {
    nft: nftReducer,
    controls: controlsReducer,
  },
});
