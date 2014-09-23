  // 设置菜单的选中状态
var setSelectState = function(activeLink) {
  activeLink.parent().addClass('active');
  var parentLi = activeLink.parent().parent().parent();
  if (parentLi.is('li')) {
    parentLi.addClass('active');
    parentLi.addClass('open');
  }
};

var handleMeunSelect = function () {
  // 首先根据当前访问的地址判断菜单中是否有对应的链接，如果有则设置为选中状态，否则使用最后一次算中状态的链接
  var path = window.location.pathname;
  var activeLink = $('ul.nav-list a[href="' + path + '"]');
  if (activeLink.length == 0) {
    activeLink = $('ul.submenu a[href=""' + path + '"]');
  }
  if (activeLink.length == 0) {
    path = localStorage.last_path;
    activeLink = $('ul.nav-list a[href="' + path + '"]');
    if (activeLink.length == 0) {
      activeLink = $('ul.submenu a[href=""' + path + '"]');
    }
  }
  if (activeLink.length != 0) {
    localStorage.last_path = path;
    setSelectState(activeLink);
  }
};
handleMeunSelect();