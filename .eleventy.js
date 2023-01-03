const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const sass = require('sass');
const postCss = require('postcss');
const fs = require('fs-extra');

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
    enabled: true,
    domdiff: true,
    port: 8080,
    portReassignmentRetryCount: 10,
    showAllHosts: false,
    https: {
      // key: "./localhost.key",
      // cert: "./localhost.cert",
    },
    folder: '.11ty',
    showVersion: false,
    encoding: 'utf-8',
  });
  eleventyConfig.on('beforeBuild', () => {
    // Compile Sass
    let result = sass.renderSync({
      file: 'src/assets/scss/main.scss',
      sourceMap: false,
      outputStyle: 'compressed',
    });
    console.log('SCSS compiled');

    // Optimize and write file with PostCSS
    let css = result.css.toString();
    postCss()
      .process(css, { from: 'main.css', to: 'assets/css/main.css' })
      .then((result) => {
        fs.outputFile('_site/assets/css/main.css', result.css, (err) => {
          if (err) throw err;
          console.log('CSS optimized');
        });
      });
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
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addPassthroughCopy('src/admin/config.yml');

  eleventyConfig.addCollection('journal', function (collection) {
    return collection.getFilteredByGlob('journal/**/*.md');
  });

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: 'layouts',
      data: '_data',
    },
  };
};
