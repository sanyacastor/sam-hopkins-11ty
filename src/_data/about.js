const fs = require('fs').promises
const path = require('path')
const fm = require('front-matter')

const aboutPath = process.cwd() + '/src/about/'

const readFiles = async filePaths => {
  const arr = []

  await Promise.all(
    filePaths.map(async filePath => {
      if (path.extname(filePath) !== '.md') return
      try {
        const markdown = await fs.readFile(aboutPath + filePath, 'utf8')
        const { attributes } = fm(markdown)
        return arr.push(attributes)
      } catch (err) {
        console.error(`Error reading file ${filePath}:`, err)
      }
    }),
  )

  return arr
}

module.exports = async () => {
  const files = await fs.readdir(aboutPath, (err, files) => {
    if (!err) return files
    console.error('Could not list the directory.', err)
    process.exit(1)
  })
  const about = await readFiles(files)
  return about
}
