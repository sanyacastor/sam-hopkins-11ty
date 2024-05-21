const path = require('path')

const Image = require('@11ty/eleventy-img')

const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const csso = require('postcss-csso')
const pimport = require('postcss-import')

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('css')

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
        return;
      }
  
      return async () => {
        let output = await postcss([
          pimport,
          autoprefixer,
          csso
        ]).process(inputContent, { from: inputPath });
  
        return output.css;
      }
    }
  });

  eleventyConfig.addShortcode(
    'image',
    async function (src, alt, className, sizes) {
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
          sizes: sizes || '(min-width: 320px) 50vw, 100vw',
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
