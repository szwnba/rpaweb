/**
 * @description 产品文档平台通用的脚本
 * @description 适合放在head标签中的脚本，比如统计、hotjar反馈等等
 */

/**
 * @description Userback
 */
//  window.Userback = window.Userback || {};
//  Userback.access_token = '37201|72492|HISQiVubJKlS5H0lPHdMllA2Z';
//  (function(d) {
//      var s = d.createElement('script');s.async = true;
//      s.src = 'https://static.userback.io/widget/v1.js';
//      (d.head || d.body).appendChild(s);
//  })(document);

 /**
  * insert common style
  */
 (function(d) {
    var s = d.createElement('link');s.rel = 'stylesheet';
    s.href = '/static/styles/common.css';
    (d.head || d.body).appendChild(s);
})(document);
