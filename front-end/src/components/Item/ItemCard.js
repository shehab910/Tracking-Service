import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {
   Box,
   CardMedia,
   Divider,
   IconButton,
   Tooltip,
   Typography,
} from "@mui/material";
import { Status } from "../order/OrderList";
import { convertToEGP } from "../../utils/utils";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ItemCard = ({ item }) => {
   const {
      product_name = "Item Name",
      additonal_notes = "well meaning and kindly.",
      original_price = "22.99",
      deal_price = "30",
      imgsrc = null,
      count = 1,
      itemIndex = -1,
      handleOnDeleteItem = () => {},
   } = item;
   const profit =
      Number.parseFloat(deal_price) -
      Number.parseFloat(original_price).toPrecision(2);

   return (
      <Card
         sx={{
            minWidth: "200px",
            display: "flex",
            width: "90%",
            height: "100%",
            paddingLeft: "0px",
         }}
         variant="outlined"
      >
         {imgsrc !== null && (
            <CardMedia
               component="img"
               sx={{ width: 200 }}
               image={imgsrc}
            ></CardMedia>
         )}
         <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            width="100%"
         >
            <CardContent>
               <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
               ></Typography>
               <Tooltip title="Item Name">
                  <Typography
                     variant="h6"
                     fontWeight="600"
                     letterSpacing={0.7}
                     component="div"
                  >
                     {product_name}
                  </Typography>
               </Tooltip>
               <Box padding={1} />
               <Tooltip title="Deal Price">
                  <Typography>{convertToEGP(deal_price)}</Typography>
               </Tooltip>
               <Tooltip title="Profit">
                  <Typography color="green">{convertToEGP(profit)}</Typography>
               </Tooltip>
               <Tooltip title="Count">
                  <Typography>{`x ${count}`}</Typography>
               </Tooltip>
               <Box padding={1} />
               <Status statusName="Paid" />
               <Box padding={1} />
               <Tooltip title="Additional Notes">
                  <Typography variant="body2" color="text.secondary">
                     {additonal_notes}
                  </Typography>
               </Tooltip>
            </CardContent>
            <Divider light variant="middle" />
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
               <Tooltip title="Delete">
                  <IconButton
                     sx={{ color: "red" }}
                     size="large"
                     onClick={(e) => handleOnDeleteItem(e, itemIndex)}
                  >
                     <DeleteForeverIcon />
                  </IconButton>
               </Tooltip>
            </CardActions>
         </Box>
      </Card>
   );
};

export default ItemCard;
