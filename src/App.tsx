import { Toaster } from "@/components/ui/toaster";
import { FormProvider, useForm } from "react-hook-form";
import { RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./Providers/ReactQueryProvider";
import { router } from "./router";
import useAuth from "./services/auth/useAuth";
import { ThemeProvider } from "./Providers/ThemeProvider";

function App() {
  const methods = useForm();
  useAuth();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReactQueryProvider>
        <FormProvider {...methods}>
          <Toaster></Toaster>
          <RouterProvider router={router} />
        </FormProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default App;
