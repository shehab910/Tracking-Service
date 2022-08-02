import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { Container, CssBaseline, Stack } from "@mui/material";
import OrderForm from "./components/order/OrderForm";
import OrderDetails from "./pages/OrderDetails";
import { statuses } from "./components/status/statusData";
import StatusInfoBox from "./components/status/StatusInfoBox";
import Layout from "./components/layout/Layout";
import OrderList from "./components/order/OrderList";

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
            <Layout>
               <Routes>
                  <Route path="/" element={<MainComponent />} />
                  <Route path="/new-order" element={<OrderForm />} />
                  <Route path="/order/:id" element={<OrderDetails />} />
               </Routes>
               <CssBaseline />
            </Layout>
         </Router>
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
         <Container
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: "2rem",
            }}
         >
            <Stack
               direction="row"
               sx={{
                  maxWidth: "80vw",
                  overflowX: "auto",
                  margin: "0 auto",
               }}
               gap={1}
            >
               {statuses.map((status, index) => (
                  <StatusInfoBox key={index} status={status} value={20} />
               ))}
            </Stack>
            {/* //! Table is not responsive */}
            <OrderList />
         </Container>
      </>
   );
};
