/**
 * @description 产品文档平台通用的脚本
 * @description 适合放在body结束标签前的脚本，比如对dom的操作
 */
/**
 * @description 返回带有高亮样式的html字符串
 */
const changeContentStyle = (content, targetList) => {
  let result = content;
  // 字符串数组去重
  const tempTargetList = [...new Set(targetList)];
  const escapedTargetList = [];
  tempTargetList.forEach((e) => {
    escapedTargetList.push(e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  });
  tempTargetList.sort((a, b) => {
    return b.length - a.length;
  })
  if (content) {
    const regStr = `(${tempTargetList.join('|')})`;
    result = result.replace(
      new RegExp(regStr, 'gi'),
      '<span class="search-key" style=\'color: #636b77;background-color: #d6e0ff;\'>' + '$1' + '</span>'
    );
    return result;
  } else {
    return content;
  }
};
/**
 * @description 从URL获取参数
 */
const getQueryVariable = (variable) => {
  const query = decodeURIComponent(window.location.search.substring(1));
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
};
/**
 * @description 带searchKey参数时文本高亮显示
 */
const changeStyleOnSearch = () => {
  let searchKeys = getQueryVariable('searchKey');
  if (searchKeys && searchKeys != '') {
    searchKeys = decodeURIComponent(escape(window.atob(searchKeys)));
    searchKeys = searchKeys.split(',');
    let treeWalker = document.createTreeWalker(
      document.querySelector('.theme-doc-markdown'),
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );
    let currentNode = treeWalker.currentNode;
    const nodeList = [];
    while (currentNode) {
      nodeList.push(currentNode);
      currentNode = treeWalker.nextNode();
    }
    nodeList.forEach((element) => {
      if (element.nodeType === 3) {
        const newDom = document.createElement('span');
        newDom.innerHTML = changeContentStyle(element.nodeValue, searchKeys);
        element.parentElement.insertBefore(newDom, element);
        element.parentElement.removeChild(element);
      }
    });
  }
}
window.onload = function () {
  changeStyleOnSearch();
  if (document.querySelector('.search-key')) {
    document.querySelector('.search-key').scrollIntoView(true)
    document.documentElement.scrollTop -= 200
  }
  // 插入样式
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(`
    .forbidden-scroll {
      /* overflow-y: hidden !important; */
    }
    .forbidden-scroll .navbarHideable_aKYr {
      transform: initial;
    }
    .ant-input-affix-wrapper {
      border-radius: unset !important;
      z-index: 2 !important;
    }
    .ant-input-search-button{
      z-index: 1 !important;
    }
    .navbar__items--right{
      z-index: 0;
    }
    .ant-input-suffix{
      padding-right: 6px !important;
    }
  `))
  const head = document.querySelector('head');
  head.appendChild(style);

  if (document.querySelector('.footer__copyright')) {
    const footerText = document.querySelector('.footer__copyright').innerText;
    const newFooterText = footerText.replace(/20\d{2}/, new Date().getFullYear());
    document.querySelector('.footer__copyright').innerText = newFooterText;
  }
};