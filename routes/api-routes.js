var db = require("../models");

module.exports = function(app) {

//  GET ROUTE FOR ((ALL POSTS))
  app.get("/api/posts", function(req, res) {
    
    db.Post.findAll({}).then(posts => res.json(posts));
  });

// GET ROUTE FOR ((CATEGORY OF POSTS))
  app.get("/api/posts/category/:category", function(req, res) {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    }).then(posts => res.json(posts));
  });

//  GET ONLY ((SINGLE POST BY ID))
  app.get("/api/posts/:id", function(req, res) {
    db.Post.singlePost({
      where: {
        id: req.params.id
      }
    }).then(post => res.json(post));
  });

// POST ((MAKE ORIGINAL POST))
  app.post("/api/posts", function(req, res) {
   
    db.Post.create(req.body).then(results => res.json(results));
  });

// PUT ROUTE ((TO EDIT PAST POST))
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
      where: {
        id: req.body.id
      }
    }).then(results => res.json(results));
  });
};

// --------------------------------------------------------------
// GIPHY API
// --------------------------------------------------------------
$('#giphy').on('click', function () {
    event.preventDefault()
  var settings = {
      "async": true,
      "crossDomain": true,
    "url": "https://giphy.p.rapidapi.com/v1/gifs/translate?" 
    + "rating=" + "pg"
    + "&s=" + $('#how-feel').val() + "&api_key=dc6zaTOxFJmzC",
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "giphy.p.rapidapi.com",
          "x-rapidapi-key": "b30834a494msh1bea8fbe543d693p1b3792jsnd8e0f7019e3a"
      }
  }
  console.log(settings)
  $.ajax(settings).done(function (response) {
    var response= response.data.images.original.url
    console.log(response);
    $('#giphyResponse').append("<img src='"+ response + "'/> " )
  })})