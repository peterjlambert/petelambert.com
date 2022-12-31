const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const EleventyPluginNavigation = require('@11ty/eleventy-navigation');
const EleventyPluginRss = require('@11ty/eleventy-plugin-rss');
const EleventyPluginSyntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const readingTime = require('eleventy-plugin-reading-time');

const filters = require('./utils/filters.js');
const transforms = require('./utils/transforms.js');
const shortcodes = require('./utils/shortcodes.js');

const { resolve } = require('path');

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(EleventyPluginNavigation);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight);
  eleventyConfig.setServerOptions({
    // Default values are shown:

    // Opt-out of the live reload snippet
    enabled: true,

    // Opt-out of DOM diffing updates and use page reloads
    domdiff: true,

    // The starting port number to attempt to use
    port: 8080,

    // number of times to increment the port if in use
    portReassignmentRetryCount: 10,

    // Show local network IP addresses for device testing
    showAllHosts: false,

    // Use a local key/certificate to opt-in to local HTTP/2 with https
    https: {
      // key: "./localhost.key",
      // cert: "./localhost.cert",
    },

    // Change the name of the special folder name used for injected scripts
    folder: '.11ty',

    // Show the server version number on the command line
    showVersion: false,

    // Change the default file encoding for reading/serving files
    encoding: 'utf-8',
  });

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'after',
      class: 'direct-link',
      symbol: '#',
      level: [1, 2, 3, 4],
    }),
    slugify: eleventyConfig.getFilter('slug'),
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Layouts
  eleventyConfig.addLayoutAlias('main', 'main.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('home', 'home.njk');

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy('src/assets/css');
  eleventyConfig.addPassthroughCopy('src/assets/js');

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      // better not use "public" as the name of the output folder (see above...)
      output: 'build',
      includes: '_includes',
      layouts: 'layouts',
      data: '_data',
    },
  };
};

// const { join } = require('path');
// const { buildDest: output, buildSrc } = require('./paths');
// const helpers = require('./src/helpers');

// const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
// const pluginRss = require('@11ty/eleventy-plugin-rss');
// const readingTimePlugin = require('eleventy-plugin-reading-time');
// const typesetPlugin = require('./src/plugins/typeset');

// const env = process.env.NODE_ENV;
// const isDevelopment = env === 'development';

// // https://www.11ty.io/docs/config/

// module.exports = function(config) {
//   Object.keys(helpers).forEach((name) => {
//     config.addFilter(name, helpers[name]);
//   });

//   // Add plugins
//   config.addPlugin(pluginRss);
//   config.addPlugin(readingTimePlugin);
//   config.addPlugin(syntaxHighlight);
//   config.addPlugin(
//     typesetPlugin({
//       only: '.article-text',
//       disable: ['smallCaps'],
//     })
//   );

//   config.addCollection('allPosts', (collection) =>
//     collection
//       .getFilteredByTag('posts')
//       .filter((post) => (isDevelopment ? true : !post.data.draft))
//       .reverse()
//   );

//   return {
//     dir: {
//       input: join(buildSrc, 'site'),
//       output,
//     },
//     templateFormats: ['njk', 'md'],
//     htmlTemplateEngine: 'njk',
//     markdownTemplateEngine: 'njk',
//     passthroughFileCopy: true,
//   };
// };
