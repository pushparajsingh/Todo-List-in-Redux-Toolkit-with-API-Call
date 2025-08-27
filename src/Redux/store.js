import { configureStore } from "@reduxjs/toolkit";
import store from "./reduxSlice";

export default configureStore({
  reducer: { store },
});
