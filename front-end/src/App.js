import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderList from "./components/order/OrderList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { Container, CssBaseline, Stack, Box, Typography } from "@mui/material";
import InfoBox from "./components/UI/InfoBox";
// import AutoCompleteInput from "./components/UI/AutoCompleteInput";
// import useClientForm from "./components/ClientFrom";
import ItemForm from "./components/UI/ItemForm";
import OrderForm from "./components/order/OrderForm";
import ItemCard from "./components/Item/ItemCard";
import ItemList from "./components/Item/ItemList";
import OrderDetails from "./pages/OrderDetails";
import { statuses } from "./components/status/statusData";
import StatusInfoBox from "./components/status/StatusInfoBox";

const theme = createTheme({
   palette: {
      primary: {
         main: purple[500],
      },
      secondary: {
         main: green[500],
      },
   },
});

function App() {
   return (
      <ThemeProvider theme={theme}>
         <Router>
            <Routes>
               <Route path="/" element={<MainComponent />} />
               <Route path="/new-order" element={<OrderForm />} />
               <Route path="/order/:id" element={<OrderDetails />} />
            </Routes>
         </Router>
         <CssBaseline />
      </ThemeProvider>
   );
}

export default App;

const MainComponent = () => {
   // return (
   //    <Container>
   //       {/* <Typography textAlign="center" variant="h2" gutterBottom>
   //          New Order
   //       </Typography> */}
   //       <Box margin={5}>
   //          <OrderForm />
   //          {/* <ItemCard /> */}
   //          {/* <ItemList /> */}
   //       </Box>
   //    </Container>
   // );
   return (
      <>
         <header>
            <h2>Dashboard</h2>
         </header>
         <main>
            <Container
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
               }}
               maxWidth="lg"
            >
               <Stack direction="row">
                  {statuses.map((status, index) => (
                     <StatusInfoBox key={index} status={status} value={20} />
                  ))}
               </Stack>
               <OrderList />
            </Container>
         </main>
      </>
   );
};
