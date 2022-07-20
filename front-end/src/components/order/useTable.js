import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { TableContainer, TableHead } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//    table: {

//    },
// }));
const useTable = (records, headCells) => {
   //    const classes = useStyles();
   const TblContainer = (props) => (
      <TableContainer
         sx={{
            backgroundColor: "white",
            marginTop: 2,
            "& thead th": {
               fontWeight: "700",
               color: "grey.600",
               letterSpacing: "0.1rem",
               textTransform: "uppercase",
               fontSize: "0.7rem",
            },
            "& tbody td": {
               fontWeight: "500",
               fontSize: "1rem",
            },
            "& tbody tr": {
               "&:hover": {
                  backgroundColor: "grey.200",
                  cursor: "pointer",
               },
            },
         }}
      >
         <Table>{props.children}</Table>
      </TableContainer>
   );

   const TblHead = (props) => {
      return (
         <TableHead>
            <TableRow>
               {headCells.map((column) => (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
               ))}
            </TableRow>
         </TableHead>
      );
   };

   return { TblContainer, TblHead };
};

export default useTable;
