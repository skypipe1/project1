
// Initial buttons of  recipe list

var recipe = ["Beef", "Egg", "Onion", "Carrot", "Apple",];

// Function for displaying buttons with recipe names
function photoDisplay() {

  $(".buttonList").empty();

  for (var i = 0; i < recipe.length; i++) {
    var a = $("<button>");
    a.addClass("clicker btn btn-info");
    a.attr("recipeName", recipe[i]);
    a.text(recipe[i]);
    $(".buttonList").append(a);
  }
}

photoDisplay();

// adding recipe button in the last part of button list

$("body").on("click", '#recipeSearch', function(event) {

  event.preventDefault();
  var recipes = $("#typerecipe").val().trim();
    recipe.push(recipes);
    $("#typerecipe").val('')
    photoDisplay();
});

// Displaying images

$("body").on("click", '.clicker', function() {
  
  var recipes = $(this).attr("recipeName");
  console.log("recipeName -" + recipes + "-");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    recipes + "&apikey=Uaa050vPXcgpmF4xYnUedB0lk0spE0qB";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var results = response.data;
      console.log(response);
      $('#images').empty();

// Displaying rating

      for (var i = 0; i < results.length; i++) {
        var images = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $('<p>')
          .append("Rating: " + rating );

// Set the image in "Still-sate" in default
        var recipesImage = $("<img class='img-thumbnail'>");
        var recipesUrl = results[i].images.fixed_height.url;
        var recipetill = results[i].images.fixed_height_still.url;
        recipesImage.attr({
            src: recipetill,
            'data-still': recipetill,
            'data-animate': recipesUrl,
            'data-state':"still"
        });

        images.prepend(p);
        images.prepend(recipesImage);

        $("#images").prepend(images);
      };
    });
});

// switch to "Animate-state"

$("body").on("click", '.img-thumbnail', function() {
  var state = $(this).attr('data-state');
  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }
  else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});
