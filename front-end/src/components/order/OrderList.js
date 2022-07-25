import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import { useState } from "react";
import useTable from "./useTable";
import { Chip, Tooltip } from "@mui/material";

const columns = [
   { field: "id", headerName: "Order ID", width: 70 },
   { field: "clientName", headerName: "Client", width: 130 },
   {
      field: "status",
      headerName: "Status",
      width: 90,
   },
   { field: "date", headerName: "Date", width: 130 },
   {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 160,
   },
];

const rowsData = [
   { id: 1, date: "1-2-2022", clientName: "Jon", status: "paid", price: 13.99 },
   {
      id: 2,
      date: "2-2-2022",
      clientName: "Cersei",
      status: "paid",
      price: 23.99,
   },
   {
      id: 3,
      date: "3-2-2022",
      clientName: "Jaime",
      status: "paid",
      price: 33.99,
   },
   {
      id: 4,
      date: "4-2-2022",
      clientName: "Arya",
      status: "paid",
      price: 43.99,
   },
   {
      id: 5,
      date: "5-2-2022",
      clientName: "Daenerys",
      status: "paid",
      price: 53.99,
   },
   { id: 6, date: "6-2-2022", clientName: null, status: "paid", price: 63.99 },
   {
      id: 7,
      date: "7-2-2022",
      clientName: "Ferrara",
      status: "paid",
      price: 73.99,
   },
   {
      id: 8,
      date: "8-2-2022",
      clientName: "Rossini",
      status: "paid",
      price: 83.99,
   },
   {
      id: 9,
      date: "9-2-2022",
      clientName: "Harvey",
      status: "paid",
      price: 93.99,
   },
];

const onCellClickHandler = (params, event, details) => {
   console.log(params);
   console.log(event);
   console.log(details);
};

const OrderList = () => {
   const [rows, setRows] = useState([...rowsData]);
   const { TblContainer, TblHead } = useTable(rows, columns);
   return (
      <>
         <Paper
            sx={{
               backgroundColor: "white",
               borderRadius: "10px",
               paddingInline: 5,
               paddingTop: 3,
               paddingBottom: 5,
               boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.075)",
            }}
         >
            <h3>Recent Orders</h3>
            <TblContainer>
               <TblHead />
               <TableBody>
                  {rows.slice(0, 5).map((order) => (
                     <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.clientName}</TableCell>
                        <TableCell>
                           <Status statusName={order.status} />
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.price}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </TblContainer>
         </Paper>
      </>
   );
};
export function Status({ statusName }) {
   return (
      <Tooltip title="Status">
         <Chip
            sx={{ color: "red", borderColor: "red" }}
            variant="outlined"
            label={statusName}
         />
      </Tooltip>
   );
}
export default OrderList;
