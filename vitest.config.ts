import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      testTimeout: 10000,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", ["lcov", { projectRoot: "../.." }]],
      },
      exclude: [...configDefaults.exclude],
      setupFiles: ["./test/setup.ts"],
    },
  }),
);
