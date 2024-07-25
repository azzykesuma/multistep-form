import { configureStore } from "@reduxjs/toolkit";
import EditForm from "@/slices/EditForm";

export const store = configureStore({
  reducer: {
    Form: EditForm
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
