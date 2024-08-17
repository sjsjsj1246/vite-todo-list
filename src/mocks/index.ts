import { setupWorker } from "msw/browser";
import { todoHandlers } from "./todo/handlers";

export const worker = setupWorker(...todoHandlers({ delayAmount: 200 }));
