import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   FormHelperText,
} from "@mui/material";

const ComboBox = ({
   CBState: { value, setValue },
   CBOptions,
   label,
   helperText = " ",
   required = false,
}) => (
   <FormControl required={required} fullWidth margin="normal">
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
         labelId={`${label}-label`}
         id={label}
         value={value}
         label={label}
         onChange={(e) => {
            setValue(e.target.value);
         }}
      >
         {CBOptions.map((item, index) => (
            <MenuItem key={index} value={item}>
               {item}
            </MenuItem>
         ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
   </FormControl>
);

export default ComboBox;
