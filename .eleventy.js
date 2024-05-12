const esbuild = require("esbuild");
const { minify } = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("min", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return minify(content, {
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
      });
    }
  });

  // JS Bundling
  eleventyConfig.on("eleventy.before", async () => {
    esbuild.build({
      bundle: true,
      minify: true,
      sourcemap: true,
      entryPoints: ["src/js/index.js"],
      outfile: "public/bundle.js",
      target: ["chrome58", "firefox57", "safari11", "edge16"],
    });
  });

  eleventyConfig.addWatchTarget("/src/js/");
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Netlify CMS
  eleventyConfig.addPassthroughCopy("./src/admin");

  // Custom Fonts
  eleventyConfig.addPassthroughCopy("./src/fonts/KareliaWeb-Bold.woff2");
  eleventyConfig.addPassthroughCopy("./src/fonts/KareliaWeb-Regular.woff2");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
