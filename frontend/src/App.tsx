import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { StyledEngineProvider, CssBaseline } from "@mui/material";
import { router } from "./routes";
import Loading from "./pages/Loading";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "moment/locale/pt-br";
import Middleware from "./pages/Middleware";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
        <CssBaseline />
        <Middleware />
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

export default App;
