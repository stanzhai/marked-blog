$(document).ready(function() {
  var s = $(".mb-sidebar .mb-sidenav").width(),
  t = $(".mb-sidebar h1").width(),
  u = $(".mb-sidebar .nav-toggle").css("margin-left");
  $(".mb-sidebar .toggle-bar").click(function() {
    $(".mb-sidebar .mb-sidenav").animate({
      width: "0",
      opacity: "0"
    },
    600),
    $(".mb-sidebar h1").animate({
      width: "0",
      opacity: "0"
    },
    600),
    $(".mb-sidebar").animate({
      width: "50px"
    },
    600),
    $(".mb-content").animate({
      width: "90%"
    },
    600),
    $(".mb-sidebar .nav-toggle").animate({
      "margin-left": "0",
      opacity: "0"
    },
    575,
    function() {
      $(".mb-sidebar .nav-toggle").hide(),
      $(".mb-sidebar-mini").animate({
        width: "26px"
      },
      200)
    })
  }),
  $(".mb-sidebar-mini .toggle-bar").click(function() {
    $(".mb-sidebar-mini").animate({
      width: "0"
    },
    200,
    function() {
      $(".mb-sidebar .nav-toggle").show(),
      $(".mb-sidebar .mb-sidenav").animate({
        width: s,
        opacity: "1"
      },
      600),
      $(".mb-sidebar h1").animate({
        width: t,
        opacity: "1"
      },
      600),
      $(".mb-sidebar .nav-toggle").animate({
        "margin-left": u,
        opacity: "1"
      },
      600),
      $(".mb-sidebar").animate({
        width: "23.404255319148934%"
      },
      600),
      $(".mb-content").animate({
        width: "74.46808510638297%"
      },
      600)
    })
  })
});