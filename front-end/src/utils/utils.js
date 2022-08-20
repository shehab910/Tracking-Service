import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
export const firstLetterUpper = (string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Description: field name is the label name, if more than word separate by _.
 * @param {Object} fieldData - Object should be shaped like:
 * {
 * fieldName: { value: "", error: "", textFieldProps: {placeholder: "", required: Boolean, etc}  }
 * }.
 * @param {Function} fieldDataReducer - Function to set the field data.
 * @param {Boolean} disabled - If true, All inputs will be disabled
 * @returns {Array} Array of styled TextFields
 */
export const useInputFields = (
   fieldData,
   fieldDataReducer,
   disabled = false
) => {
   const dispatch = useDispatch();
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      dispatch(fieldDataReducer({ name, value }));
      // setFieldData((prev) => {
      //    return { ...prev, [name]: { ...prev[name], value: value } };
      // });
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

export const convertToEGP = (number) => {
   if (!(number instanceof Number)) number = parseFloat(number);
   return number.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
   });
};

export const fetchConvertUSDtoEGP = async (price) => {
   //TODO: remove moke data
   return new Promise((resolve, reject) => {
      const productInfoJson = {
         result: 123,
      };
      const success = true;
      setTimeout(() => {
         success ? resolve(productInfoJson) : reject("blz");
      }, 1000);
   });

   price = price.replace(/[^0-9.]/g, "");
   const convRes = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?from=${"USD"}&to=${"EGP"}&amount=${price}`,
      {
         method: "GET",
         redirect: "follow",
         headers: {
            "Content-Type": "application/json",
            apikey: process.env.REACT_APP_CURRENCY_API_KEY,
         },
      }
   );
   return convRes.json();
};

export const regexTesters = {
   isUrl: (input) =>
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
         input
      ),
   isEmail: (input) => /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(input),
};

export const extractErrorMessage = (error) => {
   return (
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
   );
};

/**
 * @param {"facebook" | "instagram" | "whatsapp"} socialMediaPlatform
 * @param {String} socialMediaId
 * @returns {String} social media profile url
 */

export const getSocialMessageUrl = (socialMediaPlatform, socialMediaId) => {
   const os = getOS();
   switch (`${socialMediaPlatform}`) {
      case "facebook":
         switch (os) {
            case "android":
               //open chat in android messenger app
               return `https://m.me/${socialMediaId}`;
            case "ios":
               return `fb-messenger://user-thread/${socialMediaId}`;
            default:
               return `https://www.facebook.com/messages/t/${socialMediaId}`;
         }
      case "instagram":
         switch (os) {
            case "android":
               return `instagram://user?username=${socialMediaId}`;
            case "ios":
               return `instagram://user?username=${socialMediaId}`;
            default:
               return `https://www.instagram.com/${socialMediaId}`;
         }
      case "whatsapp":
         switch (os) {
            case "android":
               return `https://wa.me/${socialMediaId}`;
            case "ios":
               return `https://wa.me/${socialMediaId}`;
            default:
               return `https://web.whatsapp.com/send?phone=${socialMediaId}`;
         }
      default:
         return "#";
   }
};

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android' or 'Browser'.
 *
 * @returns {"android" | "ios" | "browser"}
 */
export const getOS = () => {
   const userAgent = navigator.userAgent || navigator.vendor || window.opera;

   if (/android/i.test(userAgent)) {
      return "android";
   }

   // iOS detection from: http://stackoverflow.com/a/9039885/177710
   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "ios";
   }

   return "browser";
};
