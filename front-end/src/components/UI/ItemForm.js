import { Box, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { getInputFields, sliceBetween } from "../../utils/utils";

const initialItemData = {
   product_link: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "https://www.shein.com/product",
         required: true,
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
      textFieldProps: { placeholder: "21.99", required: true },
   },
   deal_price: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "26.99", required: true },
   },
   count: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "1", required: true },
   },
};

const ItemForm = () => {
   const [item, setItem] = useState(initialItemData);

   useEffect(() => {
      setItem((prev) => {
         return {
            ...prev,
            product_name: {
               ...prev.product_name,
               value: sliceBetween(
                  prev.product_link.value,
                  "shein.com/",
                  "-p-"
               ).replaceAll("-", " "),
            },
         };
      });
   }, [item.product_link.value]);

   const validateItem = () => {
      let error = {};
      error.product_link = /^https:\/\/.*\..*..*$/.test(
         item.product_link.value.trim()
      )
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

   const handleOnSumbit = (e) => {
      e.preventDefault();
      if (validateItem()) {
         console.log(item);
      }
   };

   const inputFields = getInputFields(item, setItem);
   return (
      <form onSubmit={handleOnSumbit}>
         <Grid container spacing={3}>
            <Grid
               item
               sx={{ display: "flex", flexDirection: "column" }}
               xs={12}
            >
               {inputFields.map((i) => i)}
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
