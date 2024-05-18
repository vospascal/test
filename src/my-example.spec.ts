import { describe, expect, it, vi } from "vitest";
import { html } from "lit";
import { nextTick, mountComponent } from "../test/index"

describe("Button", () => {

  it("renders inital count is 0", async () => {
    const wrapper = await mountComponent(html`<my-element></my-element>`);

    const button = wrapper.shadowRoot?.querySelector("button");

    
    expect(button).toBeDefined()

    expect(button!.textContent?.trim()).toBe("count is 0");

  });

  it("renders count is 2", async () => {
    const wrapper = await mountComponent(html`<my-element></my-element>`);

    const button = wrapper.shadowRoot?.querySelector("button");

    const spy = vi.fn();

    wrapper.addEventListener("click", spy);

    button.click();
    button.click();

    await nextTick();

    expect(spy).toHaveBeenCalledTimes(2);


    expect(button!.textContent?.trim()).toBe("count is 2");

  });

});
