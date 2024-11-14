import { Toaster } from "@/components/ui/toaster";
import { FormProvider, useForm } from "react-hook-form";
import { RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./Providers/ReactQueryProvider";
import { router } from "./router";

function App() {
  const methods = useForm();

  return (
    <ReactQueryProvider>
      <FormProvider {...methods}>
        <Toaster></Toaster>
        <RouterProvider router={router} />
      </FormProvider>
    </ReactQueryProvider>
  );
}

export default App;
