const weh = require('@weh/weh')
const matter = require('@weh/matter')
const markdown = require('@weh/markdown')
const layouts = require('@weh/layouts')

const rename = require('./plugins/rename')

function layoutsFilter (file, options, files) {
  return file.path.endsWith('.md')
}

const siteLayouts = {
  main: require('./layouts/main')
}

weh(async site => {
  site.config({
    source: 'src',
    destination: 'dest'
  })

  site.use(matter)
  site.use(markdown)
  site.use(layouts, { filter: layoutsFilter, layouts: siteLayouts })
  site.use(rename, {
    filter: file => file.path.endsWith('.md'),
    extension: 'html'
  })

  return site
})
