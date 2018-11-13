var topics = ["one", "day", "there", "was", " a burrito", "that", "woke", "up", "on a", "sunday"];
var numberOfGIFs = 6
var setRating = "G";

function renderButtons() {
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn");
    newButton.addClass("gif-button");
    newButton.text(topics[i]);
    $("#button-container").append(newButton);
  }
  $(".gif-button").unbind("click");
  $(".gif-button").on("click", function() {
    $(".gif-image").unbind("click");
    $("#gif-container").empty();
    $("#gif-container").removeClass("");
    populateGIFContainer($(this).text());
  });
}


// ---------------ADD BUTTON --------------------//
function addButton(show) {
  if (topics.indexOf(show) === -1) {
    topics.push(show);
    $("#button-container").empty();
    renderButtons();
  }
}

// ----------------------Populate Gifs on page-----------------------//
function populateGIFContainer(show) {
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search?q=" + show +
      "&api_key=o1cqiDpGsLUAZQNvNZL3F5qakU1g9Acm&rating=" + setRating + "&limit=" + numberOfGIFs,
    method: "GET"
  }).then(function(response) {
    response.data.forEach(function(element) {
      newDiv = $("<div>");
      newDiv.addClass("individual-gif-container");
      newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
      var newImage = $("<img src = '" + element.images.fixed_height.url + "'>");
      newImage.addClass("gif-image");
      newImage.attr("animated-data", element.images.fixed_height.url);
      newDiv.append(newImage);
      $("#gif-container").append(newDiv);
    });
  });
}

$(document).ready(function() {
  renderButtons();
  $("#submit").on("click", function() {
    event.preventDefault();
    addButton($("#gif-show").val().trim());
    $("#gif-show").val("");
  });
});