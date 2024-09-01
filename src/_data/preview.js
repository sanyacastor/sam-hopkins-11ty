const fs = require('fs').promises
const path = require('path')
const fm = require('front-matter')

const projectsPath = process.cwd() + '/src/projects/'

const readFiles = async filePaths => {
  const arr = []
  await Promise.all(
    filePaths.map(async filePath => {
      if (path.extname(filePath) !== '.md') return
      try {
        const markdown = await fs.readFile(projectsPath + filePath, 'utf8')
        const { attributes } = fm(markdown)
        arr.push({
          ...attributes,
          // previewDescription: preview.previewDescription,
          fileName: filePath.replace('.md', ''),
        })
      } catch (err) {
        console.error(`Error reading file ${filePath}:`, err)
      }
    }),
  )

  return arr
}

module.exports = async () => {
  const files = await fs.readdir(projectsPath, (err, files) => {
    if (!err) return files
    console.error('Could not list the directory.', err)
    process.exit(1)
  })
  const projects = await readFiles(files)
  return projects
}
