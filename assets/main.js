////////////// Firebase Config Info
$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBtmBGJ0CmKRiG-3iwfhoxsP3t2lCLH-pA",
        authDomain: "homework7-7fa84.firebaseapp.com",
        databaseURL: "https://homework7-7fa84.firebaseio.com",
        projectId: "homework7-7fa84",
        storageBucket: "homework7-7fa84.appspot.com",
        messagingSenderId: "1053524989704"
    };
    firebase.initializeApp(config);

    ////////////// Firebase variable to refer the database
    var database = firebase.database();

    ////////////// Variables for the onClick event
    

    $("#add-food").on("click", function () {
        event.preventDefault();

        ///////////// Data storage
        var name = $("#food-name").val().trim();

        //// Pushing to database
        database.ref().push({
            name: name,
        });
        // $("form")[0].reset();
        food2fork(name);
    });

    /////////// Appending on Dashboard
    database.ref().on("child_added", function (childSnapshot) {
        $("#add-history").append("<tr><td>" + childSnapshot.val().name);
    });

    // //////   Writing on the Dashboard
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
        $("#name-display").html(snapshot.val().name);
    });
});


function food2fork(foodStuff) {
    // lee api key for food 2 fork api
    // 4791db24d21a9301c80389743b916b8e

    // skylar's api key for food 2 fork api
    // 5b7ba731be534597e05f61a79a345596

    // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
    var title = foodStuff;
    var queryURL = "https://www.food2fork.com/api/search?key=5b7ba731be534597e05f61a79a345596&q=" + title;
    console.log(queryURL);
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {

    //     var res = JSON.parse(response);
    //     var data = res.recipes;
    //     for (var i = 0; i < data.length; i++) {
    //         //    trying to get title to display as a hyperlink still 1/26/18
    //         console.log(data);
    //         var recipeLink = data[i].f2f_url;
    //         var newLink = $("<a>");
    //         newLink.attr("href", recipeLink);
    //         newLink.attr("target","_blank");

    //         // newTitle.text(data[i].title)
    //         var recipeTitle = data[i].title;
    //         var newTitle = $("<h3>").html(recipeTitle);

    //         newLink.text(data[i].source_url)
    //         $("#recipes").append(newTitle)
    //         $("#recipes").append(newLink)

    //     }
    // });

};


  // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
//   var nutrient = "chicken";
//   var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=6cd68ac6&app_key=a4a3a7428895a85fb63293d28563589e&ingr=" + nutrient;


//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     console.log(response.Runtime);
//     $("#nutrients").append(response);

//   });


   // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
//    var title = "onion";
//    var queryURL = "https://www.food2fork.com/api/search?key=4791db24d21a9301c80389743b916b8e&q=" + title;

//    $.ajax({
//      url: queryURL,
//      method: "GET"
//    }).then(function(response) {
//      var res = JSON.parse(response);
//      for (var i = 0; i < res.recipes.length; i++){
//         var newTitle = $("<h3>").attr("#recipes", newTitle);
//         newTitle.text(res.recipes[i].title);
//         $("#recipes").append(newTitle);
//         console.log(res.recipes);

//      }



//    });