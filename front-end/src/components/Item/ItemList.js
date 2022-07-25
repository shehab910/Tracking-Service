import { Grid } from "@mui/material";
import ItemCard from "./ItemCard";

export const dumpstate = [
   {
      itemName: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
   },
   {
      itemName: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
   },
   {
      itemName: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
   },
   {
      itemName: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
   },
   {
      itemName: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
   },
   {
      itemName: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
   },
   {
      itemName: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
   },
];

const ItemList = ({ items = dumpstate }) => {
   return (
      <Grid container spacing={3}>
         {items.map((item, index) => {
            return (
               <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ItemCard {...item} />
               </Grid>
            );
         })}
      </Grid>
   );
};

export default ItemList;
