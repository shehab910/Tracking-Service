import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { Status } from "../order/OrderList";
import { convertToEGP } from "../../utils/utils";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ItemCard = ({
   itemName = "Item Name",
   notes = "well meaning and kindly.",
   origPrice = "22.99",
   dealPrice = "30",
}) => {
   const profit =
      Number.parseFloat(dealPrice) -
      Number.parseFloat(origPrice).toPrecision(2);

   return (
      <Card sx={{ width: "fit-content", minWidth: "200px" }} variant="outlined">
         <CardContent>
            <Typography
               sx={{ fontSize: 14 }}
               color="text.secondary"
               gutterBottom
            ></Typography>
            <Tooltip title="Item Name">
               <Typography
                  variant="h5"
                  fontWeight="600"
                  letterSpacing={0.7}
                  component="div"
               >
                  {itemName}
               </Typography>
            </Tooltip>
            <Box padding={1} />
            <Tooltip title="Deal Price">
               <Typography>{convertToEGP(dealPrice)}</Typography>
            </Tooltip>
            <Tooltip title="Profit">
               <Typography color="green">{convertToEGP(profit)}</Typography>
            </Tooltip>
            <Box padding={1} />
            <Status statusName="Paid" />
            <Box padding={1} />
            <Tooltip title="Additional Notes">
               <Typography variant="body2" color="text.secondary">
                  {notes}
               </Typography>
            </Tooltip>
         </CardContent>
         <Divider light variant="middle" />
         <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Delete">
               <IconButton sx={{ color: "red" }} size="large">
                  <DeleteForeverIcon />
               </IconButton>
            </Tooltip>
         </CardActions>
      </Card>
   );
};

export default ItemCard;
