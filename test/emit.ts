import { it } from "vitest";

const keyboardEvents = ["keydown", "keypress", "keyup"];
const dragEvents = ["drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop"];

/**
 * Emit an event on a given element.
 * This method will automatically determine the type of event and will ensure the event will bubble like a regular event.
 * @param element The HTML element to trigger the event on. Test will fail if this element does not exist
 * @param eventName Name of the event to trigger
 * @param options Any options that will be used as the options of the event. `bubbles` and `composed` are `true` by default.
 */

export default async function (
  element: Element | Node | null | undefined,
  eventName: string,
  options: Record<string, unknown> = {},
): Promise<Event> {
  if (!element) {
    it.fails("Tried to emit an event on an element that does not exist");
    throw "error";
  }

  const eventOptions = { bubbles: true, composed: true, ...options };
  const EventClass = keyboardEvents.includes(eventName) ? KeyboardEvent : CustomEvent;
  const event = new EventClass(eventName, eventOptions);

  event.preventDefault = vi.fn();

  // dataTransfer property is not copied over for CustomEvents, only for DragEvents
  // but DragEvents are not defined in vitest
  if (dragEvents.includes(eventName)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore dataTransfer does not exist on a CustomEvent
    event.dataTransfer = eventOptions.dataTransfer;
  }

  element.dispatchEvent(event);

  return event;
}
