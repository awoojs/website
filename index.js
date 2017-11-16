const awoo = require('awoo')
const matter = require('awoo-matter')
const markdown = require('awoo-markdown')
const layouts = require('awoo-layouts')
const pretty = require('awoo-pretty')
const tachyons = require('weh-tachyons')
const vfile = require('vfile')

function layoutsFilter (file, options, files) {
  return ['.md', '.html'].some(e => e === file.extname)
}

const siteLayouts = {
  main: require('./layouts/main')
}

const addCNAME = () => {
  return files => [...files, vfile({
    path: 'CNAME',
    contents: 'awoo.js.org'
  })]
}

awoo(async site => {
  site.config({
    source: 'src',
    destination: 'dest'
  })

  site.use(matter)
  site.use(markdown)
  site.use(layouts, { filter: layoutsFilter, layouts: siteLayouts })
  site.use(pretty)
  site.use(tachyons)
  site.use(addCNAME)

  return site
}).then(() => {
  console.log('site built!')
}).catch(err => {
  console.log(err)
})
