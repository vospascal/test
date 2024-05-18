/**
 * Convenience method to wait a short while before continuing running a test
 */

export default async function (timeInMs = 0): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, timeInMs));
  return;
}
