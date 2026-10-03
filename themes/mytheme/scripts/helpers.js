/**
 * mytheme 自定义辅助函数
 */

var moment = require('moment');

/**
 * 统一日期格式，避免 page.date 被二次解析时行为不一致
 */
hexo.extend.helper.register('mytheme_date', function (value) {
  if (!value) return '';

  var m = moment.isMoment(value) ? value : moment(value);
  if (!m.isValid()) return '';

  return m.format('YYYY-MM-DD');
});

/**
 * 构建导航菜单。
 * 支持两种写法：
 *   menu:
 *     Home: /          -> 用 Home 作为多语言 key 取当前语言文案
 *     我的小站: /mine   -> 取不到翻译时原样显示
 */
hexo.extend.helper.register('mytheme_menu', function (menu) {
  var self = this;
  var items = [];

  if (!menu) return items;

  if (Array.isArray(menu)) {
    menu.forEach(function (path) {
      items.push({ name: path, path: path });
    });
    return items;
  }

  Object.keys(menu).forEach(function (name) {
    var label = self.__(name);
    if (!label) label = name;

    items.push({ name: label, path: menu[name] });
  });

  return items;
});

/**
 * 首页/归档页的摘要文本：优先用 <!-- more --> 之前的内容，
 * 否则截断正文纯文本。
 */
hexo.extend.helper.register('mytheme_excerpt', function (post, length) {
  var text = '';

  if (post.excerpt) {
    text = post.excerpt;
  } else if (post.content) {
    text = post.content;
  }

  text = String(text).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  var limit = parseInt(length, 10);
  if (limit > 0 && text.length > limit) {
    text = text.slice(0, limit) + '...';
  }

  return text;
});
