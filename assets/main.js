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
        console.log(childSnapshot.val().name)
        $("#add-history").append(`<button class="btn side-btn"> ${childSnapshot.val().name} </button>`);
    });

    

    $(document).on('click', '.side-btn', function(){
        var title = $(this).text();
        console.log(title);
        $('input#food-name').val(title);
        food2fork(title);


    });

    // //////   Writing on the Dashboard
    // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    //     // $("#name-display").html(snapshot.val().name);
    // });
});


function food2fork(foodStuff) {
    // lee api key for food 2 fork api
    // 4791db24d21a9301c80389743b916b8e
    
    // skylar's api key for food 2 fork api
    // 5b7ba731be534597e05f61a79a345596
    
    // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
    var title = encodeURIComponent(foodStuff);
    var queryURL = "https://www.food2fork.com/api/search?key=5b7ba731be534597e05f61a79a345596&q=" + title;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var res = JSON.parse(response);
        var data = res.recipes;
        $("#recipes").empty();
        for (var i = 0; i < data.length; i++) {
            //    trying to get title to display as a hyperlink still 1/26/18
            console.log(data);
            var recipeLink = data[i].f2f_url;
            var newLink = $("<a>");
            newLink.attr("href", recipeLink);
            newLink.attr("target", "_blank");

            // newTitle.text(data[i].title)
            var recipeTitle = data[i].title;
            var newTitle = $("<h3>").html(recipeTitle);

            newLink.text(data[i].source_url)
            $("#recipes").append(newTitle)
            $("#recipes").append(newLink)

        }
    });

    
    var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=338f014d&_app_key=b887c8c8767616c0a35ad4bdd051f009&q=" + title + "&maxResult=10&start=10"
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var data1 = response.matches;
        $("#nutrients").empty();
        for (var i = 0; i < data1.length; i++) {

            console.log(data1[i].imageUrlsBySize[90]);
            var imageTitle = data1[i].imageUrlsBySize[90];
            var newImage = $("<img>");
            newImage.attr("src", imageTitle);
            newImage.addClass('animated lightSpeedIn foodImg');
            $("#nutrients").append(newImage);
        }



    });
};