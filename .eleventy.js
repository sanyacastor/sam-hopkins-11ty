
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets')

  // Netlify CMS
  eleventyConfig.addPassthroughCopy('./src/admin')
  eleventyConfig.addPassthroughCopy('./src/_scripts')

  // Custom Fonts
  eleventyConfig.addPassthroughCopy('KareliaWeb-Bold.woff2')
  eleventyConfig.addPassthroughCopy('KareliaWeb-Regular.woff2')
  
	eleventyConfig.addPlugin(bundlerPlugin); 

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
