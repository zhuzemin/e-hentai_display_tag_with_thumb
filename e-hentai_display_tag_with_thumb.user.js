// ==UserScript==
// @name        E-Hentai Display Tag with thumb
// @namespace   https://github.com/zhuzemin
// @description E-Hentai 显示Tag在缩略图模式
// @include     https://exhentai.org/
// @include     https://e-hentai.org/
// @include     https://exhentai.org/?*
// @include     https://e-hentai.org/?*
// @include     https://exhentai.org/tag/*
// @include     https://e-hentai.org/tag/*
// @version     1.0
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// @author      zhuzemin
// @license     Mozilla Public License 2.0; http://www.mozilla.org/MPL/2.0/
// @license     CC Attribution-ShareAlike 4.0 International; http://creativecommons.org/licenses/by-sa/4.0/
// @connect-src e-hentai.org
// @connect-src exhentai.org
// ==/UserScript==
var config = {
  'debug': false
}
var debug = config.debug ? console.log.bind(console)  : function () {
};
class Gallery{
  constructor(href) {
    this.method = 'GET';
    this.url = href;
    this.headers = {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/atom+xml,application/xml,text/xml',
      'Referer': window.location.href,
    };
    this.charset = 'text/plain;charset=utf8';
  }
}
var init = function () {
  var divs = document.querySelectorAll('div.gl1t');
  for (var i = 0; i < divs.length; ++i) {
    (function (div) {
      var href = div.querySelector('a').href;
      debug(href);
      var gallery = new Gallery(href);
      GM_xmlhttpRequest({
        method: gallery.method,
        url: gallery.url,
        headers: gallery.headers,
        overrideMimeType: gallery.charset,
        //synchronous: true
        onload: function (responseDetails) {
          debug(responseDetails);
          var galleryHtml = new DOMParser().parseFromString(responseDetails.responseText, "text/html");
          debug(galleryHtml);
          var taglist = galleryHtml.querySelector('#taglist');
          div.insertBefore(taglist, null);
        }
      });
    }) (divs[i]);
  }
}
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
window.addEventListener('DOMContentLoaded', init);
