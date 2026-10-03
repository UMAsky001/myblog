/*!
 * mytheme - main.js
 * 当前版本刻意保持极简：不做动效，只做一点点交互增强。
 */
(function () {
  'use strict';

  // ---------- 文章正文里的外链在新标签打开 ----------
  function externalLinks() {
    var content = document.querySelector('.post-content');
    if (!content) return;

    var links = content.querySelectorAll('a[href^="http"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      if (href.indexOf(location.host) === -1) {
        links[i].setAttribute('target', '_blank');
        links[i].setAttribute('rel', 'noopener');
      }
    }
  }

  // ---------- 代码块加一个横向滚动容器，避免长行撑破面板 ----------
  function wrapCodeBlocks() {
    var blocks = document.querySelectorAll('.post-content pre');
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].setAttribute('tabindex', '0');
    }
  }

  // ---------- 导航栏里的实时时间 ----------
  function startClock() {
    var el = document.getElementById('site-clock');
    if (!el) return;

    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }

    function tick() {
      var d = new Date();
      el.textContent = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
        ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }

    tick();
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      externalLinks();
      wrapCodeBlocks();
      startClock();
    });
  } else {
    externalLinks();
    wrapCodeBlocks();
    startClock();
  }
})();
