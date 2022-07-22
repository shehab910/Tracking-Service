import { Grid, Button, Box } from "@mui/material";
import { useState } from "react";
import { getInputFields } from "../utils/utils";
import { useAutoCompleteInput } from "./UI/AutoCompleteInput";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const initialClientData = {
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

const ClientForm = () => {
   const [client, setClient] = useState(initialClientData);
   const {
      AutoCompleteInput,
      value: autoCValue,
      defaultValue: autoCDefaultValue,
   } = useAutoCompleteInput({
      label: "Client",
      options: ["red", "Blue", "Green", "Yellow"],
   });
   const validateClient = () => {
      let error = {};
      error.name = /^[a-zA-Z ]{2,20}$/.test(client.name.value.trim())
         ? ""
         : "Should be between 2 and 20 characters";
      error.phone = /^\d{11}$/.test(client.phone.value)
         ? ""
         : "Should be 11 numbers";
      error.email = /^$|.+@.+\..+/.test(client.email.value)
         ? ""
         : "Should be in proper format";

      setClient((prevClient) => {
         let tmp = { ...prevClient };
         Object.keys(tmp).forEach((key) => (tmp[key].error = error[key]));
         return tmp;
      });
      return Object.values(error).every((v) => v === "");
   };

   const handleOnSubmit = (e) => {
      e.preventDefault();
      if (validateClient()) {
         console.log(client);
      }
   };
   const inputTextFields = getInputFields(client, setClient);
   return (
      <form onSubmit={handleOnSubmit}>
         <Grid container spacing={3}>
            <Grid item xs={12}>
               <AutoCompleteInput />
            </Grid>
            <Grid
               item
               sx={{ display: "flex", flexDirection: "column" }}
               xs={12}
               sm={12}
               md={6}
            >
               {inputTextFields
                  .slice(0, Math.ceil(inputTextFields.length / 2))
                  .map((i) => i)}
            </Grid>
            <Grid
               item
               sx={{ display: "flex", flexDirection: "column" }}
               xs={12}
               sm={12}
               md={6}
            >
               {inputTextFields
                  .slice(
                     Math.ceil(inputTextFields.length / 2),
                     inputTextFields.length
                  )
                  .map((i) => i)}
            </Grid>
            <Grid item xs={12}>
               <Box
                  display="flex"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                  maxWidth={{ sm: "fit-content" }}
               >
                  <Button
                     startIcon={<AddIcon />}
                     type="submit"
                     size="large"
                     variant="contained"
                     disabled={autoCValue !== autoCDefaultValue}
                  >
                     Add Client
                  </Button>
                  <Button
                     startIcon={<EditIcon />}
                     size="large"
                     variant="contained"
                     disabled={autoCValue === autoCDefaultValue}
                  >
                     Edit Client
                  </Button>
               </Box>
            </Grid>
         </Grid>
      </form>
   );
};

export default ClientForm;
