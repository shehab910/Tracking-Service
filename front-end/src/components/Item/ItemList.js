import { Grid } from "@mui/material";
import ItemCard from "./ItemCard";

export const dumpstate = [
   {
      title: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
      imgsrc:
         "//img.ltwebstatic.com/images3_pi/2022/06/22/16558827890283d20814d942332bdd574ce44701eb_thumbnail_900x.webp",
   },
   {
      title: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
      imgsrc:
         "//img.ltwebstatic.com/images3_pi/2021/12/21/1640085106bb4fc9c89b70cfeffc64ccea0096fc2a_thumbnail_900x.webp",
   },
   {
      title: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
      imgsrc:
         "//img.ltwebstatic.com/images3_pi/2022/06/22/1655882797fb6fa192fed4f9cb0c74c5f1b7773c28_thumbnail_900x.webp",
   },
   {
      title: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
      imgsrc:
         "//img.ltwebstatic.com/images3_pi/2022/06/22/1655882797fb6fa192fed4f9cb0c74c5f1b7773c28_thumbnail_900x.webp",
   },
   {
      title: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
      imgsrc:
         "//img.ltwebstatic.com/images3_pi/2022/06/22/1655882797fb6fa192fed4f9cb0c74c5f1b7773c28_thumbnail_900x.webp",
   },
   {
      title: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
      imgsrc:
         "//img.ltwebstatic.com/images3_pi/2022/06/22/1655882797fb6fa192fed4f9cb0c74c5f1b7773c28_thumbnail_900x.webp",
   },
   {
      title: "Item Name",
      notes: "well meaning and kindly.",
      origPrice: "22.99",
      dealPrice: "30",
      imgsrc:
         "//img.ltwebstatic.com/images3_pi/2022/06/22/1655882797fb6fa192fed4f9cb0c74c5f1b7773c28_thumbnail_900x.webp",
   },
];

const ItemList = ({ itemsState, showimg = true }) => {
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
                  />
               </Grid>
            );
         })}
      </Grid>
   );
};

export default ItemList;
