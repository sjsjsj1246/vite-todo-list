import axios from "axios";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

await init();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
