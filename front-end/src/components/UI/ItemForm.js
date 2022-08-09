import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
   fetchConvertUSDtoEGP,
   useInputFields,
   sliceBetween,
   regexTesters,
   firstLetterUpper,
} from "../../utils/utils";
import { useAsync } from "../../utils/customhooks";

const apiuri = process.env.REACT_APP_BACKEND_URI;

const initialItemData = {
   product_link: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "https://www.shein.com/product",
         required: true,
         helperText: " ",
      },
   },
   product_name: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "",
         required: true,
         helperText: "Auto filled when link is entered",
      },
   },
   original_price: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "21.99",
         required: true,
         helperText: "Auto filled in EGP when link is entered",
      },
   },
   deal_price: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "26.99", required: true, helperText: " " },
   },
   count: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "1", required: true, helperText: " " },
   },
   additonal_notes: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "Size: L, Color: Blue", helperText: " " },
   },
};

const validateItem = (item, setItem) => {
   const { isUrl } = regexTesters;
   let error = {};
   // error.product_link = /^https:\/\/.*\..*..*$/.test(
   //    item.product_link.value.trim()
   // )
   error.product_link = isUrl(item.product_link.value.trim())
      ? ""
      : "Should be in proper format";
   error.original_price = /^[\d]+(\.[\d]+)?$/.test(item.original_price.value)
      ? ""
      : "Should be in proper format ex. 21.99";
   error.deal_price = /^[\d]+(\.[\d]+)?$/.test(item.deal_price.value)
      ? ""
      : "Should be in proper format ex. 21.99";
   error.count = /^[1-9][0-9]*$/.test(item.count.value)
      ? ""
      : "Should be a positive integer";
   setItem((prevClient) => {
      let tmp = { ...prevClient };
      Object.keys(tmp).forEach((key) => (tmp[key].error = error[key]));
      return tmp;
   });
   return Object.values(error).every((v) => v === "");
};

const ItemForm = ({ setItems }) => {
   const [item, setItem] = useState(initialItemData);
   const [itemImgSrc, setItemImgSrc] = useState("");

   const { loading, error, value } = useAsync(async () => {
      const link = item.product_link.value;
      const validateLink = () => {
         const isValid = regexTesters.isUrl(item.product_link.value.trim());
         setItem((prev) => {
            let tmp = { ...prev };
            tmp.product_link.error =
               tmp.product_link.textFieldProps.helperText = isValid
                  ? ""
                  : "Should be in proper format";
            return tmp;
         });
         return isValid;
      };
      if (link === undefined || link === "" || !validateLink(item, setItem))
         return;
      if (link) {
         const productInfoRes = await fetch(`${apiuri}/getproduct/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: link }),
         });
         const productInfoJson = await productInfoRes.json();
         setItemImgSrc(productInfoJson.imgsrc);

         return fetchConvertUSDtoEGP(productInfoJson.price).then(
            (currencyJson) => {
               productInfoJson.price = currencyJson.result;
               console.log(currencyJson.result);
               return {
                  ...productInfoJson,
               };
            }
         );
      }
   }, [item.product_link.value]);

   useEffect(() => {
      let newTitle = value?.title || "";
      let newPrice = value?.price || "";
      if (error) {
         newTitle = sliceBetween(
            item.product_link.value,
            "shein.com/",
            "-p-"
         ).replaceAll("-", " ");
      }

      setItem((prev) => {
         let tmp = { ...prev };
         tmp.product_link.textFieldProps.helperText = " ";
         tmp.product_name.value = `${newTitle}`;
         tmp.original_price.value = `${newPrice}`;
         Object.keys(tmp).forEach(
            (key) => (tmp[key].textFieldProps.disabled = loading || false)
         );
         return tmp;
      });
   }, [loading, value, error]);

   const handleOnSumbit = (e) => {
      e.preventDefault();
      if (validateItem(item, setItem)) {
         let tmp = { ...item };
         Object.keys(tmp).forEach((key) => (tmp[key] = tmp[key].value || ""));
         tmp.imgsrc = itemImgSrc;
         console.log(tmp);
         setItems((prev) => [...prev, { ...tmp }]);
      }
   };
   const inputFields = Object.keys(item).map((curritem, index) => (
      <TextField
         margin="normal"
         key={index}
         variant="outlined"
         label={firstLetterUpper(curritem).replace("_", " ")}
         name={curritem}
         value={item[curritem].value}
         onChange={(e) => {
            const { name, value } = e.target;

            setItem((prev) => {
               return { ...prev, [name]: { ...prev[name], value: value } };
            });
         }}
         placeholder={item[curritem].placeholder}
         {...(item[curritem].error && {
            error: true,
            helperText: item[curritem].error,
         })}
         {...item[curritem].textFieldProps}
         hidden={true}
      />
   ));
   return (
      <form onSubmit={handleOnSumbit}>
         <Grid container spacing={3}>
            <Grid
               item
               sx={{ display: "flex", flexDirection: "column" }}
               xs={12}
               sm={12}
               md={6}
            >
               {inputFields.slice(0, Math.ceil(inputFields.length / 2))}
            </Grid>
            <Grid
               item
               sx={{ display: "flex", flexDirection: "column" }}
               xs={12}
               sm={12}
               md={6}
            >
               {inputFields.slice(
                  Math.ceil(inputFields.length / 2),
                  inputFields.length
               )}
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
                     size="large"
                     variant="contained"
                     type="submit"
                  >
                     Add Item
                  </Button>
               </Box>
            </Grid>
         </Grid>
      </form>
   );
};

export default ItemForm;
