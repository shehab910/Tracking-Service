import { Autocomplete, TextField } from "@mui/material";
import { useCallback, useState } from "react";

export const useAutoCompleteInput = ({ label = "", options }) => {
   const defaultValue = `Add new ${label.toLowerCase()}`;
   options = [...options, `${defaultValue}`];

   const [value, setValue] = useState(defaultValue);
   const AutoCompleteInput = useCallback(() => {
      return (
         <Autocomplete
            options={options}
            disableClearable
            clearIcon=""
            autoHighlight
            renderInput={(params) => <TextField {...params} label={label} />}
            defaultValue={defaultValue}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
         />
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value, options]);
   return { AutoCompleteInput, setValue, value, defaultValue };
};
