import { Grid } from "@mui/material";
import ItemCard from "./ItemCard";

const ItemList = ({ itemsState, showimg = true, actionsDisabled = false }) => {
   const [items, setItems] = itemsState;
   const handleOnDeleteItem = (e, index) => {
      e.preventDefault();
      setItems((prev) => prev.filter((_, i) => i !== index));
   };
   return (
      <Grid container spacing={3}>
         {items.map((item, index) => {
            item.imgsrc = showimg ? item.imgsrc : null;
            const responsiveProps = showimg
               ? { xs: 12, sm: 12, md: 4, lg: 6 }
               : { xs: 12, sm: 6, md: 4, lg: 3 };
            return (
               <Grid
                  sx={{ width: "100%" }}
                  item
                  {...responsiveProps}
                  key={index}
               >
                  <ItemCard
                     item={{ ...item, itemIndex: index, handleOnDeleteItem }}
                     actionsDisabled={actionsDisabled}
                  />
               </Grid>
            );
         })}
      </Grid>
   );
};

export default ItemList;
