import runServer from './runServer';
const fs = require('fs');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')

module.exports = config => {
  let count = 0;
  return new Promise(resolve => {
    const bs = require('browser-sync').create();
    const compiler = webpack(config.webpack);

    // Node.js middleware that compiles application in watch mode with HMR support
    // http://webpack.github.io/docs/webpack-dev-middleware.html
    const publicPath = config.webpack[0].output.publicPath
    const webpackMiddl = webpackMiddleware(compiler, {
      publicPath: publicPath,
      stats: config.webpack[0].stats,
    });
    compiler.plugin('done', stats => {
      // Generate index.html page
      const bundle = stats.stats[0].compilation.chunks.find(x => x.name === 'main').files[0];

      const bundleserver = stats.stats[1].compilation.chunks.find(x => x.name === 'main').files[0];
      console.log(bundle)
      /*const template = fs.readFileSync('./index.ejs', 'utf8');
      const render = ejs.compile(template, { filename: './index.ejs' });
      const output = render({ debug: true, bundle: `/dist/${bundle}`, config: config.webpack });
      fs.writeFileSync('./public/index.html', output, 'utf8');*/

      // Launch Browsersync after the initial bundling is complete
      // For more information visit https://browsersync.io/docs/options
      if (++count === 1) {

      const startbs = (err)=> {
    if (!err) {
     bs.init({
         // port: process.env.PORT || 3000,
         // ui: { port: Number(process.env.PORT || 3000) + 1 },
         /* server: {
            baseDir: 'public',
            middleware: [
              webpackMiddl,
              require('webpack-hot-middleware')(compiler),
              require('connect-history-api-fallback')(),
            ],
          },*/
          proxy: {
         target: 'localhost:3000',
        // baseDir: 'public',
            middleware: [
              webpackMiddl,
              require('webpack-hot-middleware')(compiler),
              //require('connect-history-api-fallback')(),
            ],
         },
         files: ['public/dist/*.*']
        }, resolve);
        //todo browser-sync

    }
};
runServer(startbs);

      }

    });
  });
};
