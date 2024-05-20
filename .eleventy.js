
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");

const Image = require('@11ty/eleventy-img')
const path = require('path')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets')
  eleventyConfig.addPassthroughCopy('img')

  eleventyConfig.addPassthroughCopy('./src/js')

  // Netlify CMS
  eleventyConfig.addPassthroughCopy('./src/admin')
  eleventyConfig.addPassthroughCopy('./src/_scripts')

  // Custom Fonts
  eleventyConfig.addPassthroughCopy('./src/fonts/KareliaWeb-Bold.woff2')
  eleventyConfig.addPassthroughCopy('./src/fonts/KareliaWeb-Regular.woff2')

  eleventyConfig.addShortcode(
    'image',
    async function (src, alt, className, sizes) {

      // return "<img src='#placeholder.jpg' alt='image is missing'>";
      try {
        let metadata = await Image(`src${src}`, {
          widths: [300, 600, 1000],
          formats: ['avif', 'jpeg'],
          outputDir: './public/img/',
          filenameFormat: function (_, src, width, format) {
            const extension = path.extname(src)
            const name = path.basename(src, extension)

            return `${name}-${width}w.${format}`
          },
        })

        let imageAttributes = {
          alt: alt || '',
          sizes: sizes || '(min-width: 30em) 50vw, 100vw',
          loading: 'lazy',
          decoding: 'async',
          class: className,
        }

        return Image.generateHTML(metadata, imageAttributes)
      }
      catch (err){
        console.log(err)
        // return "<img src='#placeholder.jpg' alt='image is missing'>";
      }
    },
  )

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
