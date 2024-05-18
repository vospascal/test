import { TemplateResult, render } from "lit";
import { expect, vi } from "vitest";
import nextTick from "./nextTick";

// Mock the generateString method to always return the same value for testing snapshots
vi.mock("../utilities", async () => {
  const originalModules = await vi.importActual<typeof import("../utilities")>("../utilities");

  // Note that every call of generateString will increment the number and return a unique string
  const mockedGenerateString = vi.fn().mockImplementation(() => {
    return "generatedString" + mockedGenerateString.mock.calls.length;
  });

  return {
    ...originalModules,
    // Mocked module(s) go here:
    generateString: mockedGenerateString,
  };
});

export default async function mountComponent(
  litTemplate: TemplateResult,
  expectErrorLog = false,
): Promise<HTMLElement> {
  let consoleSpy;
  if (!expectErrorLog) {
    consoleSpy = vi.spyOn(console, "error").mockReturnThis();
  }

  // Clear any old mounted component.
  // This prevents 'lit' from being smart and reusing the old component instance to set new properties
  render("", document.body);
  render(litTemplate, document.body);

  // Import index after rendering to simulate how a HTML page would render
  await import("../src/my-example-library");

  // Minor wait to make sure the DOM is updated with the new data
  await nextTick();

  if (consoleSpy) {
    expect(consoleSpy).not.toHaveBeenCalled();
  }

  return document.body.children[0] as HTMLElement;
}
