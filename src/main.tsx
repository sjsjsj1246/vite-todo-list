import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function init() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks");

    return worker.start();
  } else {
    axios.defaults.baseURL = "http://some.api.url";
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

init().then(() => {
  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
});
