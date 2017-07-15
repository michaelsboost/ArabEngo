$(document).ready(function() {
  $("a[href=#scroll-tab-1]").trigger("click");

  $(".comingsoon").click(function() {
    alertify.message('coming soon..');
  });
  
  $(".lesson-types a").on("click", function() {
    var lessonType = $(this).find("span").text();
    $(this).parent().parent().next().find("[data-output=questiontype]").text(lessonType);
  });
});