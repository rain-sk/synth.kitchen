import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outdir: "./build",
    external: ["server-name-gen", "uuid"],
    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: false,
    platform: "neutral",
    target: "esnext",
    format: "esm",
    color: true,
  })
  .then(() => console.log("⚡ Bundle build complete ⚡"))
  .catch(() => {
    process.exit(1);
  });
