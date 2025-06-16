import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outdir: "./dist",
    external: ["server-name-gen", "uuid"],
    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: false,
    platform: "neutral",
    target: "esnext",
    format: "esm",
    color: true,
    tsconfig: "./tsconfig.json",
  })
  .then(() => console.log("⚡ Bundle build complete ⚡"))
  .catch(() => {
    process.exit(1);
  });
