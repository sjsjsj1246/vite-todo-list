/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/export */
import type { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook, type RenderOptions } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => render(ui, { wrapper, ...options });
const customRenderHook: typeof renderHook = (render, options) => renderHook(render, { wrapper, ...options });

export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
