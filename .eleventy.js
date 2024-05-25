const path = require('path')

const Image = require('@11ty/eleventy-img')

const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const csso = require('postcss-csso')
const pimport = require('postcss-import')

const eleventyImage = require('markdown-it-eleventy-img')

const IMAGE_CONFIG = {
  widths: [300, 600, 1000],
  formats: ['avif', 'jpeg'],
  outputDir: './public/img/',
  filenameFormat: function (_, src, width, format) {
    const extension = path.extname(src)
    const name = path.basename(src, extension)

    return `${name}-${width}w.${format}`
  },
}

const IMAGE_SIZES = '(min-width: 320px) 50vw, 100vw'

const markdownIt = require('markdown-it')({
  html: true,
  breaks: true,
}).use(eleventyImage, {
  imgOptions: IMAGE_CONFIG,
  resolvePath: (filepath, env) => path.join('./src/', filepath),
  globalAttributes: {
    class: 'markdown-image--mobile',
    decoding: 'async',
    sizes: IMAGE_SIZES,
  },
})

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('css')

  // Markdown parser
  eleventyConfig.setLibrary('md', markdownIt)

  // Assets
  eleventyConfig.addPassthroughCopy('./src/assets/icons')
  eleventyConfig.addPassthroughCopy('img')

  // Fonts
  eleventyConfig.addPassthroughCopy('./src/fonts/KareliaWeb-Bold.woff2')
  eleventyConfig.addPassthroughCopy('./src/fonts/KareliaWeb-Regular.woff2')

  // Scripts
  eleventyConfig.addPassthroughCopy('./src/js')

  // Netlify CMS
  eleventyConfig.addPassthroughCopy('./src/admin')
  eleventyConfig.addPassthroughCopy('./src/_scripts')

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (inputContent, inputPath) => {
      if (inputPath !== './src/styles/index.css') {
        return
      }

      return async () => {
        let output = await postcss([pimport, autoprefixer, csso]).process(
          inputContent,
          { from: inputPath },
        )

        return output.css
      }
    },
  })

  eleventyConfig.addShortcode(
    'image',
    async function (src, alt, className, sizes) {
      try {
        const metadata = await Image(`src${src}`, IMAGE_CONFIG)
        const imageAttributes = {
          alt: alt || '',
          sizes: sizes || IMAGE_SIZES ,
          loading: 'lazy',
          decoding: 'async',
          class: className,
        }

        return Image.generateHTML(metadata, imageAttributes)
      } catch (err) {
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
