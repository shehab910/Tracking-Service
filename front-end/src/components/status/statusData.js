import PaidIcon from "@mui/icons-material/PaidOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

/**
 * @typedef {import Status from '../types'} Status
 */

export const statuses = [
   "requested",
   "ordered",
   "arrived-abroad",
   "arrived-home",
   "delivered",
];

/** @param {Status} status */
export const getStatusProps = (status) => {
   if (status === "requested")
      return {
         mainColor: "#FF0D0D",
         secondaryColor: "#ff0d0d55",
         icon: RequestQuoteOutlinedIcon,
      };
   if (status === "ordered")
      return {
         mainColor: "#FF4E11",
         secondaryColor: "#FF4E1155",
         icon: ShoppingCartCheckoutOutlinedIcon,
      };
   if (status === "arrived-abroad")
      return {
         mainColor: "#FF8E15",
         secondaryColor: "#FF8E1555",
         icon: LocalShippingOutlinedIcon,
      };
   if (status === "arrived-home")
      return {
         mainColor: "#ACB334",
         secondaryColor: "#ACB33455",
         icon: FlightLandOutlinedIcon,
      };
   if (status === "delivered")
      return {
         mainColor: "#69B34C",
         secondaryColor: "#69B34C55",
         icon: PaidIcon,
      };
};
