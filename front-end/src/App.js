import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderList from "./components/order/OrderList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { Container, CssBaseline, Stack } from "@mui/material";
import InfoBox from "./components/UI/InfoBox";
import PaidIcon from "@mui/icons-material/PaidOutlined";

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
            </Routes>
         </Router>
         <CssBaseline />
      </ThemeProvider>
   );
}

export default App;

const MainComponent = () => {
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
                  {Array(5)
                     .fill(0)
                     .map((_, index) => (
                        <InfoBox
                           Icon={PaidIcon}
                           title="Paid"
                           value="20"
                           mainColor="#6437fd"
                           bgColor="#f3efff"
                        />
                     ))}
               </Stack>
               <OrderList />
            </Container>
         </main>
      </>
   );
};
