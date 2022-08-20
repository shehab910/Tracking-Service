import { Grid } from "@mui/material";
import ClientCard from "./ClientCard";

const ClientList = () => {
   return (
      <Grid sx={{ width: "100%", m: "auto", alignContent: "center" }} container>
         <Grid
            item
            sx={{ display: "flex", flexDirection: "column" }}
            xs={12}
            sm={12}
            md={6}
         >
            {Array(5)
               .fill(0)
               .map((_, index) => (
                  <ClientCard />
               ))}
         </Grid>
         <Grid
            item
            sx={{ display: "flex", flexDirection: "column" }}
            xs={12}
            sm={12}
            md={6}
         >
            {Array(5)
               .fill(0)
               .map((_, index) => (
                  <ClientCard />
               ))}
         </Grid>
      </Grid>
   );
};

export default ClientList;
