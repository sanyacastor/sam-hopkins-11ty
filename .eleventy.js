module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./assets");
  eleventyConfig.addPassthroughCopy("./admin");

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
