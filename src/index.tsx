import { render } from "react-dom";
import Providers from "./core/Providers";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <Providers>
    <App />
  </Providers>,
  rootElement
);
