module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets')

  // Netlify CMS
  eleventyConfig.addPassthroughCopy('./src/admin')

  // Custom Fonts
  eleventyConfig.addPassthroughCopy('./src/fonts/KareliaWeb-Bold.woff2')
  eleventyConfig.addPassthroughCopy('./src/fonts/KareliaWeb-Regular.woff2')

  eleventyConfig.addShortcode(
    'image',
    async function (src, alt, className, sizes) {
      let metadata = await Image(`src${src}`, {
        widths: [300, 600, 1000],
        formats: ['avif', 'jpeg'],
        outputDir: './img/',
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
    },
  )

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
