// Check if there's a hash onload
if (window.location.hash === "#community") {
  $("[data-open=arabengochats]").trigger('click');
}

// Add hash when commuity is clicked
$("[data-open=arabengochats]").click(function() {
  window.location.hash = "#community";
});