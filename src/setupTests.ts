import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "mocks/server";

// jsdom에 scrollIntoView가 없어서 예외 처리
window.HTMLElement.prototype.scrollIntoView = function () {};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
