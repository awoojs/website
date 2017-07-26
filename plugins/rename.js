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
  const path = file.path.split('.')
  path.pop()
  const newPath = [path.join(), opts.extension].join('.')
  return Object.assign(file, { path: newPath })
}

module.exports = plugin
