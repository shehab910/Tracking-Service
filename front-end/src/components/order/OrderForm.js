import {
   Grid,
   Stack,
   FormGroup,
   FormControlLabel,
   Checkbox,
   Box,
   Button,
   Container,
   TextField,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import React, { useEffect, useState } from "react";
import { firstLetterUpper, useInputFields } from "../../utils/utils";
import ClientForm, { validateClient } from "../ClientForm";
import ItemForm from "../UI/ItemForm";
import ItemCard from "../Item/ItemCard";
import ItemList, { dumpstate } from "../Item/ItemList";
import ResponsiveDialog from "../UI/Dialog";
import { useSelector } from "react-redux";
import { useAsync, useEffectOnce } from "../../utils/customhooks";

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
         placeholder: "requested",
         required: true,
         helperText: "",
      },
   },

   shipping_fees: {
      value: "",
      error: "",
      textFieldProps: {
         placeholder: "49.99",
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
   error.shipping_fees = /^$|^[\d]+(\.[\d]+)?$/.test(
      orderInfo.shipping_fees.value
   )
      ? ""
      : "Should be in proper format ex. 21.99";

   setOrderInfo((prevClient) => {
      let tmp = { ...prevClient };
      Object.keys(tmp).forEach((key) => (tmp[key].error = error[key]));
      return tmp;
   });
   return Object.values(error).every((v) => v === "");
};
const apiUrl = process.env.REACT_APP_BACKEND_URI;
const OrderForm = () => {
   const [items, setItems] = useState([]);
   const [isShipped, setIsShipped] = useState(false);
   const [orderInfoForm, setOrderInfoForm] = useState(initialOrderFormData);
   const [isChosen, setIsChosen] = useState(false);
   const [chosenClient, setChosenClient] = useState({});
   const [isSubmitted, setIsSubmitted] = useState(false);

   const {
      loading: submitLoading,
      error: submitError,
      value: submitResponse,
   } = useAsync(async () => {

   }, [isSubmitted]);

   const { currClient, autoCAttributes } = useSelector(
      (state) => state.newClientForm
   );
   const { autoCValue, autoCDefaultValue } = autoCAttributes;

   useEffectOnce(() => {
      const newShippment = async () => {
         const resp = await fetch(`${apiUrl}/new-shippment`);
         const { shippmentId } = await resp.json();
         setOrderInfoForm((prevOrderInfo) => {
            let tmp = { ...prevOrderInfo };
            tmp.shippment_id.value = shippmentId;
            return tmp;
         });
      };
      newShippment();
   });
   const handleIsShipped = (e) => {
      console.log(e.target.checked);
      setIsShipped(e.target.checked);

      setOrderInfoForm((prev) => {
         let tmp = { ...prev };
         tmp.shipping_fees.textFieldProps.disabled = !e.target.checked;
         if (!e.target.checked) tmp.shipping_fees.value = "";
         return tmp;
      });
   };
   const inputFields = Object.keys(orderInfoForm).map((item, index) => (
      <TextField
         margin="normal"
         key={index}
         variant="outlined"
         label={firstLetterUpper(item).replace("_", " ")}
         name={item}
         value={orderInfoForm[item].value}
         onChange={(e) => {
            const { name, value } = e.target;

            setOrderInfoForm((prev) => {
               return { ...prev, [name]: { ...prev[name], value: value } };
            });
         }}
         placeholder={orderInfoForm[item].placeholder}
         {...(orderInfoForm[item].error && {
            error: true,
            helperText: orderInfoForm[item].error,
         })}
         {...orderInfoForm[item].textFieldProps}
         hidden={true}
      />
   ));

   const handleSubmitOrder = (e) => {
      e.preventDefault();
      if (validateOrderInfo(orderInfoForm, setOrderInfoForm)) {
         const orderInfoMapped = { ...orderInfoForm };
         Object.keys(orderInfoMapped).forEach((key) => {
            orderInfoMapped[key] = orderInfoMapped[key].value;
         });
         const order = {
            clientId: chosenClient.cid,
            items: items,
            orderInfo: orderInfoMapped,
         };
         const postNewOrder = async (order) => {
            const resp = await fetch(`${apiUrl}/orders`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(order),
            });
            const { message } = await resp.json();
            console.log(message);
         };
         postNewOrder(order);
      }
   };
   const [open, setOpen] = useState(false);

   const handleOnUpdateClient = (e) => {
      e.preventDefault();
      console.log(currClient);
      setChosenClient(currClient);
      setOpen(false);
      setIsChosen(true);
   };
   const chooseInner = (
      <Button
         startIcon={<PublishIcon />}
         size="large"
         variant="contained"
         onClick={handleOnUpdateClient}
         disabled={autoCValue === autoCDefaultValue}
      >
         Choose Client
      </Button>
   );

   const clientInfo = (
      <Box p={2}>
         {isChosen && (
            <>
               <h2>{chosenClient?.name}</h2>

               <p>
                  {chosenClient?.email}
                  <br />
                  {chosenClient?.phone}
                  <br />
                  {chosenClient?.address}
                  <br />
               </p>
            </>
         )}
         {!isChosen && <h2>No Client chosen</h2>}
      </Box>
   );

   return (
      <Container sx={{ marginY: 3 }}>
         <Stack spacing={3}>
            <h1>New Order</h1>
            <ResponsiveDialog
               open={open}
               setOpen={setOpen}
               dialogTitle="Choose client"
               dialogHint="Hint: You can add or edit client info here"
               dialogActions={chooseInner}
            >
               {/* <ClientForm client={client} setClient={setClient} /> */}
               <ClientForm />
            </ResponsiveDialog>
            {clientInfo}
            <Button
               startIcon={<PublishIcon />}
               size="large"
               variant="contained"
               onClick={() => setOpen(true)}
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
