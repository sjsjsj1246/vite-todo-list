import { setupServer } from "msw/node";
import { todoHandlers } from "./todo/handlers";

export const server = setupServer(...todoHandlers({ delayAmount: 0 }));
