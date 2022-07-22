import { Grid, Button, Box } from "@mui/material";
import { useState } from "react";
import { getInputFields } from "../utils/utils";
import { useAutoCompleteInput } from "./UI/AutoCompleteInput";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const initialClientData = {
   name: { value: "", error: "", placeholder: "Jaun Doe", required: true },
   phone: { value: "", error: "", placeholder: "0123456789", required: true },
   email: {
      value: "",
      error: "",
      placeholder: "jaun@example.com",
      required: false,
   },
   address: {
      value: "",
      error: "",
      placeholder: "123 Main St, Nasr City",
      required: false,
   },
   facebook_link: { value: "", error: "", placeholder: "", required: false },
   instagram_link: { value: "", error: "", placeholder: "", required: false },
};

const testAutoCInputData = {};

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
         : "Name should be between 2 and 20 characters";
      error.phone = /^\d{11}$/.test(client.phone.value)
         ? ""
         : "Phone should be 11 numbers";
      error.email = /^$|.+@.+\..+/.test(client.email.value)
         ? ""
         : "Email should be in proper format";

      setClient((prevClient) => {
         let tmp = { ...prevClient };
         Object.keys(tmp).forEach((key) => (tmp[key].error = error[key]));
         return tmp;
      });
      return Object.values(error).every((v) => v === "");
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setClient((prev) => {
         return { ...prev, [name]: { ...prev[name], value: value } };
      });
   };

   const handleOnSubmit = (e) => {
      e.preventDefault();
      if (validateClient()) {
         console.log(client);
      }
   };
   const inputTextFields = getInputFields(client, handleInputChange);
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
