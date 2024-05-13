import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastState {
  isOpen: boolean;
  message: string;
  status: number;
}

const initialState: ToastState = {
  isOpen: false,
  message: "",
  status: 400,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ToastState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = { ...action.payload };
    },
    close: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = toastSlice.actions;

export default toastSlice.reducer;
