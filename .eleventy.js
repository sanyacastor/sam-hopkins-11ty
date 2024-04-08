module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/assets/data");
  eleventyConfig.addPassthroughCopy("./assets");
  eleventyConfig.addPassthroughCopy("./assets/data");
  eleventyConfig.addPassthroughCopy("./src/admin");

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
