module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.md/,
        use: 'raw-loader'
      }
    )

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js']) {
        entries['main.js'].unshift('./lib/polyfill.js')
      }

      return entries
    }

    return config
  }
}