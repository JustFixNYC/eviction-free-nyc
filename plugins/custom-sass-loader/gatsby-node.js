/**
 * Based on `gatsby-plugin-postcss-sass`, but with the addition
 * of passing `includePaths=['node_modules']` to `sass-loader` as a query param
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')
const util = require('util')

const inspect = obj => util.inspect(obj, { colors: true, depth: 5 })

exports.modifyWebpackConfig = ({ config, stage }, { postCssPlugins }) => {
  const cssModulesConf = `css?modules&minimize&importLoaders=1`
  const cssModulesConfDev = `${cssModulesConf}&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]`

  const nmpath = path.resolve(__dirname, "../../node_modules")
  const sassLoaderOptions = [`includePaths=${nmpath}`]
  const sassLoaderQuery = `?${sassLoaderOptions.join(',')}`

  // Pass in plugins regardless of stage.
  // If none specified, fallback to Gatsby default postcss plugins.
  if(postCssPlugins) {
    config.merge(current => {
      current.postcss = postCssPlugins
      return current
    })
  }

  switch (stage) {
    case `develop`: {
      config.loader(`sass`, {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        loaders: [`style`, `css`, `postcss`, `sass${sassLoaderQuery}`],
      })

      config.loader(`sassModules`, {
        test: /\.module\.s(a|c)ss$/,
        loaders: [`style`, cssModulesConfDev, `postcss`, `sass${sassLoaderQuery}`],
      })
      break
    }
    case `build-css`: {
      config.loader(`sass`, {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract([`css?minimize`, `postcss`, `sass${sassLoaderQuery}`]),
      })

      config.loader(`sassModules`, {
        test: /\.module\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract(`style`, [
          cssModulesConf,
          `postcss`,
          `sass${sassLoaderQuery}`,
        ]),
      })
      break
    }
    case `develop-html`:
    case `build-html`: {
      config.loader(`sass`, {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        loader: `null`,
      })

      config.loader(`sassModules`, {
        test: /\.module\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract(`style`, [
          cssModulesConf,
          `postcss`,
          `sass${sassLoaderQuery}`,
        ]),
      })
      break
    }
    case `build-javascript`: {
      config.loader(`sass`, {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        loader: `null`,
      })

      config.loader(`sassModules`, {
        test: /\.module\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract(`style`, [cssModulesConf, `sass${sassLoaderQuery}`]),
      })
      break
    }
  }
  return config
}
