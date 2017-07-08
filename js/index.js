// Check if there's a hash onload
if (window.location.hash === "#community") {
  $("[data-open=arabengochats]").trigger('click');
} else if (window.location.hash === "#introduction") {
  $("[data-open=arabengochats]").trigger('click');
}

// Add hash when commuity is clicked
$("[data-open=arabengochats]").click(function() {
  window.location.hash = "#community";
});
$("[data-open=introduction]").click(function() {
  window.location.hash = "#introduction";
});