/**
 * Helper function to retrieve the slot element for the two exported functions: getSlotElements and getSlotNodes.
 * @param parentElement The parent element where to start the search for a slot element
 * @param slotName Name of the slot element. Defaults to the 'default' slot
 */
function _getSlot(
  parentElement: ShadowRoot | Element | null | undefined,
  slotName?: string | undefined,
): HTMLSlotElement | null {
  if (!parentElement) {
    console.error("A valid parent element is required to find slot data");
    return null;
  }

  // To make sure that empty string and 'undefined' all work correctly
  if (!slotName) {
    slotName = "default";
  }

  let slot = parentElement.querySelector(`slot[name="${slotName}"]`);
  if (!slot && slotName === "default") {
    slot = parentElement.querySelector(`slot:not([name])`);
  }

  if (!slot) {
    console.error(`Unable to find slot '${slotName}'`);
  }
  return slot as HTMLSlotElement | null;
}

/**
 * Retrieve slot elements from a parentElement. This returns only HTML elements and ignores all text nodes
 * @param parentElement The parent element where to start the search for a slot element
 * @param slotName Name of the slot element. Defaults to the 'default' slot
 */
export function getSlotElements(
  parentElement: ShadowRoot | Element | null | undefined,
  slotName?: string | undefined,
): Element[] {
  return _getSlot(parentElement, slotName)?.assignedElements() || [];
}

/**
 * Retrieve slot nodes from a parentElement. This returns all element nodes and text nodes, including text nodes containing white-space
 * @param parentElement The parent element where to start the search for a slot element
 * @param slotName Name of the slot element. Defaults to the 'default' slot
 */
export function getSlotNodes(
  parentElement: ShadowRoot | Element | null | undefined,
  slotName?: string | undefined,
): Node[] {
  return _getSlot(parentElement, slotName)?.assignedNodes() || [];
}
