import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import { firstLetterUpper } from "../utils/utils";

const initialClientData = {
   name: "",
   phone: "",
   email: "",
   address: "",
   facebook_link: "",
};
const ClientForm = () => {
   const [client, setClient] = useState(initialClientData);
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setClient((prev) => {
         return { ...prev, [name]: value };
      });
   };

   const inputTextFields = Object.keys(client).map((item, index) => (
      <TextField
         key={index}
         variant="outlined"
         label={firstLetterUpper(item).replace("_", " ")}
         name={item}
         value={client[item]}
         onChange={handleInputChange}
      />
   ));
   console.log(inputTextFields);
   return (
      <form>
         <Grid container spacing={6}>
            <Grid
               sx={{ display: "flex", flexDirection: "column", gap: 3 }}
               item
               xs={6}
            >
               {inputTextFields
                  .slice(0, Math.ceil(inputTextFields.length / 2))
                  .map((i) => i)}
            </Grid>
            <Grid
               sx={{ display: "flex", flexDirection: "column", gap: 3 }}
               item
               xs={6}
            >
               {inputTextFields
                  .slice(
                     Math.ceil(inputTextFields.length / 2),
                     inputTextFields.length
                  )
                  .map((i) => i)}
            </Grid>
         </Grid>
         <Button sx={{ marginTop: "1rem" }} size="large" variant="contained">
            Submit
         </Button>
      </form>
   );
};

export default ClientForm;
