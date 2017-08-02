function plugin (opts = {}) {
  const filter = opts.filter

  return files => {
    return files.map(file => {
      return filter(file, opts, files)
        ? transform(file, opts, files)
        : file
    })
  }
}

function transform (file, opts, files) {
  const path = file.path
  const newPath = path.replace(/\.[^]+$/i, `.${opts.extension}`)
  return Object.assign(file, { path: newPath })
}

module.exports = plugin
