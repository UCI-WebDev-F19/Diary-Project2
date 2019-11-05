$(document).ready(function() {
    var url = window.location.search;
    var postId;
    var updating = false;
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?post_id=") !== -1) {
      postId = url.split("=")[1];
      getPostData(postId);
    }
  
    var bodyInput = $("#body");
    var subjectInput = $("#subject");
    var cmsForm = $("#cms");
    var postCategorySelect = $("#category");
    postCategorySelect.val("Love");
    $(cmsForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      if (!subjectInput.val().trim() || !bodyInput.val().trim()) {
        return;
      }
      var newPost = {
        subject: subjectInput.val().trim(),
        body: bodyInput.val().trim(),
        category: postCategorySelect.val()
      };
  
      console.log(newPost);
      if (updating) {
        newPost.id = postId;
        updatePost(newPost);
      }
      else {
        submitPost(newPost);
      }
    });
  
    function submitPost(Post) {
      $.post("/api/posts/", Post, function() {
        window.location.href = "/blog";
      });
    }
  
    function getPostData(id) {
      $.get("/api/posts/" + id, function(data) {
        if (data) {
          subjectInput.val(data.subject);
          bodyInput.val(data.body);
          postCategorySelect.val(data.category);
          updating = true;
        }
      });
    }
  
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      })
        .then(function() {
          window.location.href = "/blog";
        });
    }
  });

// GIPHY API
// --------------------------------------------------------------
$('#giphyClick').on('click', function () {
    event.preventDefault()
  var settings = {
      "async": true,
      "crossDomain": true,
    "url": "https://giphy.p.rapidapi.com/v1/gifs/translate?" 
    + "rating=" + "pg"
    + "&s=" + $('#giphyText').val() + "&api_key=dc6zaTOxFJmzC",
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
    $('#response').append("<img src='"+ response + "'/> " )
  })})
  