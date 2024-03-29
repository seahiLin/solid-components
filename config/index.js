const path = require('path')
const process = require('process')

const { componentConfig } = require('@tarojs/webpack5-runner/dist/template/component')
componentConfig.includes.add('native-slot')

const config = {
  projectName: 'solid-components',
  date: '2023-1-16',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    'taro-plugin-solid',
    '@tarojs/plugin-html'
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  alias: {
    "@": path.resolve(__dirname, "../src"),
    "@tarojs/runtime": "taro-solid-runtime"
  },
  framework: 'solid',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  terser: {
    enable: false
  },
  mini: {
    webpackChain (chain, webpack) {
      chain.plugin('addGlobalVars').use(webpack.ProvidePlugin, [{
        "Node": ["@tarojs/runtime", "TaroNode"],
        "HTMLHeadElement": ["@/constants/html.ts", "HTMLHeadElement"]
      }])
      chain.plugin('replaceGlobalVars').use(webpack.DefinePlugin, [{
        __COMPILE_TYPE__: `"${process.env.TARO_ENV}"`
      }])
    },
    runtime: {
      enableTemplateContent: true,
      enableCloneNode: true,
      enableAdjacentHTML: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    sourceMapType: 'source-map',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
