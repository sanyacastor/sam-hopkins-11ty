const fs = require('fs').promises
const path = require('path')
const fm = require('front-matter')
const markdownit = require('markdown-it')

const projectsPath = process.cwd() + '/src/projects/'

const readFiles = async filePaths => {
  const md = markdownit('commonmark')

  const projects = []
  await Promise.all(
    filePaths.map(async filePath => {
      if (path.extname(filePath) !== '.md') return
      try {
        const markdown = await fs.readFile(projectsPath + filePath, 'utf8')
        const { attributes, body } = await fm(markdown)

        const currentProject = { ...attributes, body }

        currentProject.images = []

        const tokens = md.parse(body)
        const inlineTokens = tokens.filter(token => token.type === 'inline')

        inlineTokens.forEach(token => {
          token.children.forEach(child => {
            if (child.type === 'image') {
              const srcIndex = child.attrs.findIndex(attr => attr[0] === 'src')
              if (srcIndex !== -1) {
                currentProject.images.push({
                  url: child.attrs[srcIndex][1],
                  alt: child.content,
                })
              }
            }
          })
        })
        projects.push({
          ...currentProject,
          images: currentProject.images,
        })
      } catch (err) {
        console.error(`Error reading file ${filePath}:`, err)
      }
    }),
  )
  return projects
}

module.exports = async () => {
  const files = await fs.readdir(projectsPath, (err, files) => {
    if (!err) return files
    console.error('Could not list the directory.', err)
    process.exit(1)
  })
  const projects = await readFiles(files)

  const imagesPageJson = projects.map(project => ({
    id: project.id,
    title: project.title,
    images: project.images,
  }))

  await fs.writeFile(
    './public/js/projects.json',
    JSON.stringify(imagesPageJson, null, 2),
  )
  return projects
}
