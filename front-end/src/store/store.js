import { configureStore } from "@reduxjs/toolkit";
import newClientFormReducer from "./slices/newClientSlice";
import newOrderFormReducer from "./slices/newOrderSlice";
export const store = configureStore({
   reducer: {
      newClientForm: newClientFormReducer,
      newOrderForm: newOrderFormReducer,
   },
});
