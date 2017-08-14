const weh = require('@weh/weh')
const matter = require('@weh/matter')
const markdown = require('@weh/markdown')
const layouts = require('@weh/layouts')
const fs = require('fs')

function layoutsFilter (file, options, files) {
  return file.path.endsWith('.html')
}

const siteLayouts = {
  main: require('./layouts/main')
}

const getTachyons = (opts = {}) => {
  return files => {
    files.push({
      path: 'tachyons.css',
      contents: fs.readFileSync('./node_modules/tachyons/css/tachyons.min.css', 'utf-8')
    })
    return files
  }
}

weh(async site => {
  site.config({
    source: 'src',
    destination: 'dest'
  })

  site.use(matter)
  site.use(markdown)
  site.use(layouts, { filter: layoutsFilter, layouts: siteLayouts })
  site.use(getTachyons)

  return site
}).then(() => {
  console.log('site built!')
}).catch(err => {
  console.log(err)
})
