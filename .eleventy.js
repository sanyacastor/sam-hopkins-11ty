module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets')

  // Netlify CMS
  eleventyConfig.addPassthroughCopy('./src/admin')

  // Custom Fonts
  eleventyConfig.addPassthroughCopy('KareliaWeb-Bold.woff2')
  eleventyConfig.addPassthroughCopy('KareliaWeb-Regular.woff2')

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
