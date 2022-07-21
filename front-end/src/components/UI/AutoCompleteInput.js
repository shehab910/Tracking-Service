import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
const AutoCompleteInput = ({ label = "", options }) => {
   const defaultValue = `Add new ${label.toLowerCase()}`;
   const [value, setValue] = useState(defaultValue);
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

export default AutoCompleteInput;
