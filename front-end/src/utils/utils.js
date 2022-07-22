import TextField from "@mui/material/TextField";
export const firstLetterUpper = (string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Description: field name is the label name, if more than word separate by _.
 * @param {Object} fieldData - Object should be shaped like:
 * {
 * fieldName: { value: "", error: "", textFieldProps: {placeholder: "", required: Boolean, etc}  }
 * }.
 * @param {Function} setFieldData - Function to set the field data.
 * @param {Boolean} disabled - If true, All inputs will be disabled
 * @returns {Array} Array of styled TextFields
 */
export const getInputFields = (fieldData, setFieldData, disabled = false) => {
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFieldData((prev) => {
         return { ...prev, [name]: { ...prev[name], value: value } };
      });
   };
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
         {...fieldData[item].textFieldProps}
         hidden={true}
      />
   ));
};

/**
 * Description: Example
 * str = abcdefg, str1 = bc, str2 = ef => result will be (d)
 * @param {String} str - main string to be sliced
 * @param {String} str1 - slice after the last char of this string
 * @param {String} str2 - end slice before the first char of this string
 * @returns {String} sliced string
 */
export const sliceBetween = (str, str1, str2) => {
   let index1 = str.indexOf(str1);
   if (index1 === -1) return "";
   index1 += str1.length;
   const index2 = str.indexOf(str2);
   if (index2 === -1) return "";
   return str.slice(index1, index2);
};
