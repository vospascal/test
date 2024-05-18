import { defineConfig } from "vite";
import { resolve } from "path";

import typescript from "@rollup/plugin-typescript";
import { version } from "./package.json";

export default defineConfig({
  base: "./",
  define: {
    __MAJOR_VERSION__: version.split(".", 1)[0],
  },
  build: {
    emptyOutDir: false,
    minify: false,
    terserOptions: {
      mangle: false,
      keep_classnames: true,
      keep_fnames: true
  },
  target: "modules",
    sourcemap: true,
    lib: {
      entry: "src/my-example-library.ts",
            name: "myExampleLibrary",
            formats: ['es'],
            fileName: (format) => `my-example-library-${format}.js`
    },
    rollupOptions: {
      input: [
        resolve(__dirname, "src/my-example-library.ts"),
      ],
      output: {
        entryFileNames: "[name].js",
        dir: "dist",
        format: "es",
        globals: {
          lit: 'lit',
          'lit/decorators.js': 'lit/decorators.js'
      }
      },
      preserveEntrySignatures: "strict",
      plugins: [
        typescript({
          tsconfig: "./tsconfig.json", // Ensure it uses the project tsconfig
          exclude: ["test-helpers/**/*", "**/*.spec.ts", "**/*.stories.ts"],
          declaration: true,
          declarationDir: "dist/types",
          rootDir: "src"
        }),
      ],
    },
  },
});
