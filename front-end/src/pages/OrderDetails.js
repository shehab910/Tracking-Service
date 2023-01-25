import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientCard from "../components/client/ClientCard";
import ItemList from "../components/Item/ItemList";
import StatusChip from "../components/status/StatusChip";
import { itemList as dummyItems } from "../dummydata/dummyData";

const OrderDetails = () => {
   const { id } = useParams();

   return (
      <Container>
         <h1>Order {id} Details</h1>
         <h2>Client Data</h2>
         <ClientCard sx={{ m: 2 }} />
         <h2>Items</h2>
         <ItemList actionsDisabled itemsState={[dummyItems, () => {}]} />
         <h2>Order Info</h2>
         <p>
            <b>Status:</b> <StatusChip status="requested" />
            <br />
            <b>Date:</b> 1-2-2022
            <br />
            <b>Total price:</b> 100 EGP
            <br />
            <b>Total Profit:</b> <span style={{ color: "green" }}>20 EGP</span>
            <br />
         </p>
      </Container>
   );
};

export default OrderDetails;
