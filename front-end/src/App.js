import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderList from "./components/order/OrderList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";
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
            <OrderList />
         </main>
      </>
   );
};
