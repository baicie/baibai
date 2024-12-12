import { defineConfig } from "tsup";
import pkg from "./package.json";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: true,
  external: Object.keys(pkg.dependencies),
  treeshake: true,
});
