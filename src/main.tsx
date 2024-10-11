import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { ModalProvider } from "./contexts/modalContext.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import { TaskProvider } from "./contexts/taskContext.tsx";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <TaskProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </TaskProvider>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
