import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AnimatePresence } from "framer-motion";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";

const queryclient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryclient}>
        <AnimatePresence mode="wait">
          <Toaster position="bottom-right" reverseOrder={false} />

          <App />
        </AnimatePresence>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
