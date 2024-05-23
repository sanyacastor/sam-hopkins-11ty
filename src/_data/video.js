const fs = require('fs').promises
const path = require('path')
const fm = require('front-matter')

const videosPath = process.cwd() + '/src/video/'

// hqdefault.jpg
// hq720.jpg

const readFiles = async filePaths => {
  const arr = []

  await Promise.all(
    filePaths.map(async filePath => {
      if (path.extname(filePath) !== '.md') return
      try {
        const markdown = await fs.readFile(videosPath + filePath, 'utf8')
        const content = fm(markdown)

        const regex = /\/embed\/([^?]+)/
        const hash = content.attributes.link.match(regex)[1]

        arr.push({
          ...content.attributes,
          imageUrl: `https://i.ytimg.com/vi/${hash}/hqdefault.jpg`,
          hash,
        })
      } catch (err) {
        console.error(`Error reading file ${filePath}:`, err)
      }
    }),
  )

  return arr
}

module.exports = async () => {
  const files = await fs.readdir(videosPath, (err, files) => {
    if (!err) return files
    console.error('Could not list the directory.', err)
    process.exit(1)
  })
  const videos = await readFiles(files)
  return videos
}
