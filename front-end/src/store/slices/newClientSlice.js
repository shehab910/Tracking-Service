import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dummyClients } from "../../dummydata/dummyClients";
import clientServices from "../../services/clientServices";
import { extractErrorMessage } from "../../utils/utils";

export const initClientFormData = {
   name: {
      value: "",
      error: "",
      textFieldProps: {
         helperText: " ",
         placeholder: "Jaun Doe",
         required: true,
      },
   },
   phone: {
      value: "",
      error: "",
      textFieldProps: {
         helperText: " ",
         placeholder: "0123456789",
         required: true,
      },
   },
   email: {
      value: "",
      error: "",
      textFieldProps: { helperText: " ", placeholder: "jaun@example.com" },
   },
   address: {
      value: "",
      error: "",
      textFieldProps: {
         helperText: " ",
         placeholder: "123 Main St, Nasr City",
         required: false,
      },
   },
   facebook_link: {
      value: "",
      error: "",
      textFieldProps: { helperText: " ", placeholder: "" },
   },
   instagram_link: {
      value: "",
      error: "",
      textFieldProps: { helperText: " ", placeholder: "" },
   },
};
const initCurrClient = {
   name: "",
   phone: "",
   email: "",
   address: "",
   facebook_link: "",
   instagram_link: "",
   cid: "",
};
const initClientState = {
   clientsData: dummyClients,
   clientFormData: initClientFormData,
   currClient: initCurrClient,
   autoCAttributes: {
      autoCLabel: "Client",
      autoCOptions: [],
      autoCDefaultValue: "Add New Client",
      autoCValue: "Add New Client",
      autoCDisabled: false,
   },
   inputsDisabled: false,
   isEditing: false,
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
};

export const getAllClients = createAsyncThunk(
   "clients/getAllClients",
   async (_, thunkAPI) => {
      try {
         return await clientServices.get();
      } catch (error) {
         const message = extractErrorMessage(error);
         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const addNewClient = createAsyncThunk(
   "clients/addNewClient",
   async (client, thunkAPI) => {
      try {
         return await clientServices.post(client);
      } catch (error) {
         const message = extractErrorMessage(error);
         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const editClient = createAsyncThunk(
   "clients/editClient",
   async (client, thunkAPI) => {
      try {
         return await clientServices.put(client);
      } catch (error) {
         const message = extractErrorMessage(error);
         return thunkAPI.rejectWithValue(message);
      }
   }
);

const setAutoCAttributesHelp = (state, action) => {
   state.autoCAttributes = action.payload;
   if (action.payload.autoCValue !== state.autoCAttributes.autoCDefaultValue) {
      state.inputsDisabled = true;
   } else {
      state.inputsDisabled = false;
      resetFormHelp(state);
   }
   const chosenClient = state.clientsData.find(
      (c) => c.name === action.payload.autoCValue
   );
   if (chosenClient) {
      state.currClient = chosenClient;
      Object.keys(state.clientFormData).forEach((key) => {
         state.clientFormData[key].value = chosenClient[key];
      });
   }
};

const setClientFormDataHelp = (state, action) => {
   const { autoCValue } = action.payload;
   const { autoCDefaultValue } = state.autoCAttributes;

   const clientData = state.clientsData.find((c) => c.name === autoCValue);
   Object.keys(state.clientFormData).forEach((key) => {
      if (autoCValue !== autoCDefaultValue) {
         state.clientFormData[key].value = clientData[key];
      } else {
         state.clientFormData[key].value = "";
      }
   });
};

const resetFormHelp = (state) => {
   state.autoCAttributes.autoCValue = state.autoCAttributes.autoCDefaultValue;
   state.clientFormData = { ...initClientFormData };
   state.currClient = { ...initCurrClient };
};

const newClientSlice = createSlice({
   name: "newClientForm",
   initialState: initClientState,
   reducers: {
      setCurrClient: (state, action) => {
         state.currClient = action.payload;
         Object.keys(state.clientFormData).forEach((key) => {
            state.clientFormData[key].value = action.payload[key];
         });
      },
      setClientFormData: setClientFormDataHelp,
      setAutoCAttributes: setAutoCAttributesHelp,
      setErrors: (state, action) => {
         const error = action.payload;
         Object.keys(error).forEach((key) => {
            state.clientFormData[key].error = error[key];
            state.clientFormData[key].textFieldProps.helperText =
               error[key] || " ";
         });
      },
      resetStatus: (state) => {
         state.isLoading = false;
         state.isError = false;
         state.isSuccess = false;
         state.message = "";
      },
      resetForm: resetFormHelp,
      /**
       * @param {payload: "add" | "edit" | "display"} action
       */
      setMode: (state, action) => {
         if (action.payload === "add") {
            resetFormHelp(state);
            state.autoCAttributes.autoCDisabled = false;
            state.inputsDisabled = false;
            state.currClient = { ...initCurrClient };
            state.isEditing = false;
         } else if (action.payload === "edit") {
            state.autoCAttributes.autoCDisabled = true;
            state.inputsDisabled = false;
            state.isEditing = true;
         } else if (action.payload === "display") {
            state.autoCAttributes.autoCDisabled = false;
            state.inputsDisabled = true;
            state.isEditing = false;
         }
      },
      setAutoCDisabled: (state, action) => {
         state.autoCAttributes.autoCDisabled = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllClients.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(getAllClients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.clientsData = action.payload;
            state.autoCAttributes.autoCOptions = action.payload.map(
               (c) => c.name
            );
         })
         .addCase(getAllClients.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.clientsData = [];
            state.autoCAttributes.autoCOptions = [];
         })
         .addCase(addNewClient.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(addNewClient.fulfilled, (state, action) => {
            const { payload } = action;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(payload);
            state.clientsData.push(payload);
            state.autoCAttributes.autoCOptions.push(payload.name);
            state.autoCAttributes.autoCValue = payload.name;
            // setClientFormDataHelp(state, {
            //    payload: { autoCValue: payload.name },
            // });
            state.inputsDisabled = true;
         })
         .addCase(addNewClient.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(editClient.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(editClient.fulfilled, (state, action) => {
            const { payload } = action;
            state.isLoading = false;
            state.isSuccess = true;
            const index = state.clientsData.findIndex(
               (c) => c._id === payload._id
            );
            state.clientsData[index] = payload;
            state.autoCAttributes.autoCOptions[index] = payload.name;
            state.autoCAttributes.autoCValue = payload.name;
            state.currClient = payload;
            state.inputsDisabled = true;
         })
         .addCase(editClient.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         });
   },
});

export const {
   setErrors,
   setCurrClient,
   setClientFormData,
   setAutoCAttributes,
   resetStatus,
   resetForm,
   setMode,
   setAutoCDisabled,
} = newClientSlice.actions;
export default newClientSlice.reducer;
