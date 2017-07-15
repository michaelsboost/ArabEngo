$(document).ready(function() {
  $("a[href=#scroll-tab-1]").trigger("click");

  $(".comingsoon").click(function() {
    alertify.message('coming soon..');
  });
});