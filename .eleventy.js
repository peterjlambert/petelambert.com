const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const EleventyPluginNavigation = require('@11ty/eleventy-navigation');
const EleventyPluginRss = require('@11ty/eleventy-plugin-rss');
const EleventyPluginSyntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');

const rollupPluginCritical = require('rollup-plugin-critical').default;
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
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite', // Default name of the temp folder

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: 'public',
      clearScreen: false,
      server: {
        mode: 'development',
        middlewareMode: true,
      },
      appType: 'custom',
      assetsInclude: ['**/*.xml', '**/*.txt'],
      build: {
        mode: 'production',
        sourcemap: 'true',
        manifest: true,
        // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        rollupOptions: {
          output: {
            assetFileNames: 'assets/css/main.[hash].css',
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js',
          },
          plugins: [
            rollupPluginCritical({
              criticalUrl: './build/',
              criticalBase: './build/',
              criticalPages: [
                { uri: 'index.html', template: 'index' },
                { uri: 'journal/index.html', template: 'journal/index' },
                { uri: '404.html', template: '404' },
              ],
              criticalConfig: {
                inline: true,
                dimensions: [
                  {
                    height: 900,
                    width: 375,
                  },
                  {
                    height: 720,
                    width: 1280,
                  },
                  {
                    height: 1080,
                    width: 1920,
                  },
                ],
                penthouse: {
                  forceInclude: [
                    '.fonts-loaded-1 body',
                    '.fonts-loaded-2 body',
                  ],
                },
              },
            }),
          ],
        },
      },
    },
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
