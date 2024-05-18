import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import "element-internals-polyfill";

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

Element.prototype.scrollIntoView = vi.fn();
