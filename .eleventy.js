module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/assets/data");
  eleventyConfig.addPassthroughCopy("./assets");
  eleventyConfig.addPassthroughCopy("./assets/data");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./assets/data/projects");
  eleventyConfig.addPassthroughCopy("./assets/data/projects/images");


  eleventyConfig.addCollection("posts", function (collectionAPI) {
    return collectionAPI.getFilteredByGlob("./assets/data/projects/*.md");
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: 'public',
    },
  }
}
