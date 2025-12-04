/**
 * pnpmfile.cjs
 * Hook into pnpm install lifecycle to auto-approve safe build scripts
 * and patch dependencies if needed.
 */
module.exports = {
  hooks: {
    readPackage(pkg) {
      // Example: auto-approve protobufjs build script
      if (pkg.name === "protobufjs") {
        pkg.scripts = pkg.scripts || {};
        pkg.scripts.postinstall = pkg.scripts.postinstall || "node scripts/postinstall";
      }

      // Example: normalize shared-types naming if mismatched
      if (pkg.dependencies?.["@pcybacad/shared-types"]) {
        pkg.dependencies["@cybacad/shared-types"] =
          pkg.dependencies["@pcybacad/shared-types"];
        delete pkg.dependencies["@pcybacad/shared-types"];
      }

      return pkg;
    },
  },
};
