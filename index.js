const weh = require('@weh/weh')
const matter = require('@weh/matter')
const markdown = require('@weh/markdown')
const layouts = require('@weh/layouts')
const tachyons = require('weh-tachyons')

function layoutsFilter (file, options, files) {
  return file.path.endsWith('.html')
}

const siteLayouts = {
  main: require('./layouts/main')
}

const addCNAME = () => {
  return files => [...files, {
    path: 'CNAME',
    contents: 'weh.js.org'
  }]
}

weh(async site => {
  site.config({
    source: 'src',
    destination: 'dest'
  })

  site.use(matter)
  site.use(markdown)
  site.use(layouts, { filter: layoutsFilter, layouts: siteLayouts })
  site.use(tachyons)
  site.use(addCNAME)

  return site
}).then(() => {
  console.log('site built!')
}).catch(err => {
  console.log(err)
})
