import { Grid, Button, Box, Autocomplete, TextField } from "@mui/material";
import { firstLetterUpper } from "../utils/utils";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useUpdateEffect } from "../utils/customhooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   setClientFormData,
   setCurrClient,
   setAutoCAttributes,
   setErrors,
   resetStatus,
   getAllClients,
   addNewClient,
   setMode,
   resetForm,
   editClient,
} from "../store/slices/newClientSlice";
//TODO: improve regex using regex extention

export const initialClientData = {
   name: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "Jaun Doe", required: true },
   },
   phone: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "0123456789", required: true },
   },
   email: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "jaun@example.com" },
   },
   address: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "123 Main St, Nasr City",
         required: false,
      },
   },
   facebook_link: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "" },
   },
   instagram_link: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "" },
   },
};

// currClient: {
//    name: "",
//    phone: "",
//    email: "",
//    address: "",
//    facebook_link: "",
//    instagram_link: "",
//    cid: "",
// },

// autoCAttributes: {
//    autoCLabel: "Client",
//    autoCOptions: [],
//    autoCValue: "",
// },
const ClientForm = () => {
   const {
      clientsData,
      clientFormData,
      currClient,
      autoCAttributes,
      inputsDisabled,
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      isEditing,
   } = useSelector((state) => state.newClientForm);

   const { autoCLabel, autoCOptions, autoCValue, autoCDefaultValue } =
      autoCAttributes;

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getAllClients());
   }, []);

   useUpdateEffect(() => {
      if (isError) {
         window.alert(errorMessage);
      }
      if (isSuccess) {
         // window.alert("Changes done successfully");
         console.log(clientsData);
      }
      dispatch(resetStatus());
   }, [isError, isSuccess, errorMessage, dispatch]);

   const validateClient = () => {
      let error = {};
      error.name = /^[a-zA-Z ]{2,20}$/.test(clientFormData.name.value.trim())
         ? ""
         : "Should be between 2 and 20 characters";
      error.phone = /^\d{11}$/.test(clientFormData.phone.value)
         ? ""
         : "Should be 11 numbers";
      error.email = /^$|.+@.+\..+/.test(clientFormData.email.value)
         ? ""
         : "Should be in proper format";

      dispatch(setErrors(error));
      return Object.values(error).every((v) => v === "");
   };

   const handleOnAddClient = async (e) => {
      e.preventDefault();
      if (validateClient()) {
         dispatch(addNewClient(currClient));
      }
   };

   const handleSaveClient = (e) => {
      e.preventDefault();
      if (validateClient()) {
         dispatch(editClient(currClient));
         dispatch(setMode("display"));
      }
   };

   const handleCancelClient = (e) => {
      e.preventDefault();
      dispatch(setMode("add"));
   };

   const inputs = Object.keys(clientFormData).map((item, i) => (
      <TextField
         margin="dense"
         variant="outlined"
         key={i}
         label={firstLetterUpper(item).replace("_", " ")}
         name={item}
         value={clientFormData[item].value || ""}
         onChange={(e) =>
            dispatch(setCurrClient({ ...currClient, [item]: e.target.value }))
         }
         placeholder={clientFormData[item].placeholder}
         {...(clientFormData[item].error && {
            error: true,
            helperText: clientFormData[item].error,
         })}
         {...clientFormData[item].textFieldProps}
         hidden={true}
         disabled={inputsDisabled}
      />
   ));

   return (
      <form onSubmit={handleOnAddClient}>
         <Grid container spacing={3}>
            <Grid item xs={12}>
               <Autocomplete
                  disabled={autoCAttributes.autoCDisabled}
                  options={[
                     ...clientsData.map((c) => c.name),
                     autoCDefaultValue,
                  ]}
                  disableClearable
                  clearIcon=""
                  autoHighlight
                  renderInput={(params) => (
                     <TextField {...params} label={autoCLabel} />
                  )}
                  defaultValue={autoCDefaultValue}
                  value={autoCValue}
                  onChange={(event, newValue) =>
                     dispatch(
                        setAutoCAttributes({
                           ...autoCAttributes,
                           autoCValue: newValue,
                        })
                     )
                  }
               />
            </Grid>
            <Grid
               item
               sx={{ display: "flex", flexDirection: "column" }}
               xs={12}
               sm={12}
               md={6}
            >
               {inputs.slice(0, Math.ceil(inputs.length / 2))}
            </Grid>
            <Grid
               item
               sx={{ display: "flex", flexDirection: "column" }}
               xs={12}
               sm={12}
               md={6}
            >
               {inputs.slice(Math.ceil(inputs.length / 2), inputs.length)}
            </Grid>
            {/* <Grid item xs={12}>
               {inputs}
            </Grid> */}
            <Grid item xs={12}>
               <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                  maxWidth={{ sm: "fit-content" }}
               >
                  {isEditing && (
                     <Button
                        startIcon={<SaveIcon />}
                        size="medium"
                        variant="contained"
                        onClick={handleSaveClient}
                     >
                        Save
                     </Button>
                  )}
                  {isEditing && (
                     <Button
                        startIcon={<ClearOutlinedIcon />}
                        size="medium"
                        variant="outlined"
                        onClick={handleCancelClient}
                     >
                        Cancel
                     </Button>
                  )}
                  {!isEditing && (
                     <Button
                        startIcon={<AddIcon />}
                        type="submit"
                        size="medium"
                        variant="outlined"
                        disabled={autoCValue !== autoCDefaultValue}
                     >
                        Add Client
                     </Button>
                  )}
                  {!isEditing && (
                     <Button
                        startIcon={<EditIcon />}
                        size="medium"
                        variant="outlined"
                        disabled={autoCValue === autoCDefaultValue}
                        onClick={() => dispatch(setMode("edit"))}
                     >
                        Edit Client
                     </Button>
                  )}
               </Box>
            </Grid>
         </Grid>
      </form>
   );
};

export default ClientForm;
