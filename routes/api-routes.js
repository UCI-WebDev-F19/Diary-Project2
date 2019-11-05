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

// GET ROUTE FOR DATE
  app.get("api/posts/date/:date")

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

