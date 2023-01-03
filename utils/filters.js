const { DateTime } = require('luxon');

module.exports = {
  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: 'Europe/London' }).toFormat(
      String(format)
    );
  },

  dateToISO: function (date) {
    return DateTime.fromJSDate(date, { zone: 'Europe/London' }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  },

  obfuscate: function (str) {
    const chars = [];
    for (var i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return chars.join('');
  },

  filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
    );
  },

  niceDate(date) {
    return DateTime.fromJSDate(date, {
      zone: 'Europe/Amsterdam',
    }).toFormat(String('dd LLL yyyy'));
  },

  limit(arr, limit) {
    return arr.slice(0, limit);
  },
};
