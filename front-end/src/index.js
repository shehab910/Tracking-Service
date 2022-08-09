import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { store } from "./store/store";
import { Provider as ReduxProvider } from "react-redux";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
   <ReduxProvider store={store}>
      <App />
   </ReduxProvider>
);
