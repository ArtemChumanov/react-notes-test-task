import React from "react";
import Routers from "./routes/Routes";
import { ThemeProvider } from "styled-components";
import { AppTheme } from "./styles/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={AppTheme}>
        <Routers />
      </ThemeProvider>
    </div>
  );
}

export default App;
