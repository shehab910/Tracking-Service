import {
   Grid,
   Stack,
   FormGroup,
   FormControlLabel,
   Checkbox,
   Box,
   Button,
   Container,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import React, { useEffect, useState } from "react";
import { getInputFields } from "../../utils/utils";
import ClientForm, { initialClientData, validateClient } from "../ClientFrom";
import ItemForm from "../UI/ItemForm";
import ItemCard from "../Item/ItemCard";
import ItemList, { dumpstate } from "../Item/ItemList";

const initialOrderFormData = {
   shippment_id: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "#230",
         required: true,
         disabled: true,
         helperText: "Auto-generated",
      },
   },
   delivery_status: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "Ordered",
         required: true,
         helperText: "",
      },
   },

   shipping_fees: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "49.99",
         required: true,
         disabled: true,
         helperText: "Active when shipped locally is checked",
      },
   },
   additonal_notes: {
      value: "",
      error: "",
      textFieldProps: { placeholder: "Special order", helperText: " " },
   },
};

export const validateOrderInfo = (orderInfo, setOrderInfo) => {
   let error = {};
   error.delivery_status = /^[a-zA-Z ]{2,20}$/.test(
      orderInfo.delivery_status.value.trim()
   )
      ? ""
      : "Should be between 2 and 20 characters";
   error.shipping_fees = /^[\d]+(\.[\d]+)?$/.test(orderInfo.shipping_fees.value)
      ? ""
      : "Should be in proper format ex. 21.99";

   setOrderInfo((prevClient) => {
      let tmp = { ...prevClient };
      Object.keys(tmp).forEach((key) => (tmp[key].error = error[key]));
      return tmp;
   });
   return Object.values(error).every((v) => v === "");
};

const OrderForm = () => {
   const [client, setClient] = useState(initialClientData);
   const [items, setItems] = useState([]);
   const [isShipped, setIsShipped] = useState(false);
   const [orderInfo, setOrderInfo] = useState(initialOrderFormData);

   const handleIsShipped = (e) => {
      console.log(e.target.checked);
      setIsShipped(e.target.checked);

      setOrderInfo((prev) => {
         let tmp = { ...prev };
         tmp.shipping_fees.textFieldProps.disabled = !e.target.checked;
         if (!e.target.checked) tmp.shipping_fees.value = "";
         return tmp;
      });
   };
   const inputFields = getInputFields(orderInfo, setOrderInfo);

   const handleSubmitOrder = (e) => {
      e.preventDefault();
      if (validateOrderInfo(orderInfo, setOrderInfo)) {
         console.log(items);
         console.log(orderInfo);
      }
   };

   return (
      <Container sx={{ marginY: 3 }}>
         <Stack spacing={3}>
            <h1>New Order</h1>
            <ClientForm client={client} setClient={setClient} />
            <Button
               startIcon={<PublishIcon />}
               size="large"
               variant="contained"
               // disabled={autoCValue === autoCDefaultValue}
            >
               Choose Client
            </Button>
            <ItemList itemsState={[items, setItems]} />
            <ItemForm setItems={setItems} />
            <div>
               <Grid container spacing={2}>
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
                     <FormGroup sx={{ maxWidth: "fit-content" }}>
                        <FormControlLabel
                           control={<Checkbox checked={isShipped} />}
                           label="Shipped locally"
                           onChange={handleIsShipped}
                        />
                     </FormGroup>
                     <Box
                        marginY={2}
                        display="flex"
                        gap={2}
                        flexDirection={{ xs: "column", sm: "row" }}
                        maxWidth={{ sm: "fit-content" }}
                     >
                        <Button
                           startIcon={<PublishIcon />}
                           size="large"
                           variant="contained"
                           onClick={handleSubmitOrder}
                        >
                           Submit Order
                        </Button>
                     </Box>
                  </Grid>
               </Grid>
            </div>
         </Stack>
      </Container>
   );
};

export default OrderForm;
