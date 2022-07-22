import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

export const useAutoCompleteInput = ({ label = "", options }) => {
   const defaultValue = `Add new ${label.toLowerCase()}`;
   const [value, setValue] = useState(defaultValue);
   const AutoCompleteInput = () => {
      return (
         <Autocomplete
            options={[...options, `${defaultValue}`]}
            autoHighlight
            renderInput={(params) => <TextField {...params} label={label} />}
            defaultValue={defaultValue}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
         />
      );
   };
   return { AutoCompleteInput, value, defaultValue };
};
