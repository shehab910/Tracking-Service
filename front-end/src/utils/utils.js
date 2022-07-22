import TextField from "@mui/material/TextField";
export const firstLetterUpper = (string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Description: field name is the label name, if more than word separate by _.
 * @param {Object} fieldData - Object should be shaped like:
 * {
 * fieldName: { value: "", error: "", placeholder: "", required: Boolean  }
 * }.
 * @param {Function} handleInputChange - Function to handle input change
 * @param {Boolean} disabled - If true, All inputs will be disabled
 * @returns {Array} Array of styled TextFields
 */
export const getInputFields = (
   fieldData,
   handleInputChange,
   disabled = false
) => {
   return Object.keys(fieldData).map((item, index) => (
      <TextField
         margin="normal"
         key={index}
         variant="outlined"
         label={firstLetterUpper(item).replace("_", " ")}
         name={item}
         value={fieldData[item].value}
         onChange={handleInputChange}
         placeholder={fieldData[item].placeholder}
         {...(fieldData[item].error && {
            error: true,
            helperText: fieldData[item].error,
         })}
         required={fieldData[item].required}
         disabled={disabled}
      />
   ));
};
