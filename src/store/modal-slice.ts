import { createSlice } from "@reduxjs/toolkit";
import { ModalSliceInitialType } from "../types";

const initialState: ModalSliceInitialType = {
  modalType: "",
  isModalShown: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isModalShown = true;
      state.modalType = action.payload;
    },
    hideModal: (state) => {
      state.isModalShown = false;
      state.modalType = "";
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
