$(document).ready(function() {
    // POSTS GO HERE
    var postContainer = $(".post-container");
    var postCategorySelect = $("#category");
    
    $(document).on("click", "button.edit", handlePostEdit);
    postCategorySelect.on("change", handleCategoryChange);
    var posts;
  
    function getPosts(category) {
      var categoryString = category || "";
      if (categoryString) {
        categoryString = "/category/" + categoryString;
      }
      $.get("/api/posts" + categoryString, function(data) {
        console.log("Posts", data);
        posts = data;
        if (!posts || !posts.length) {
          displayEmpty();
        }
        else {
          initializeRows();
        }
      });
    }
  
    
  
    // GET ALL POSTS
    getPosts();
  
    function initializeRows() {
      postContainer.empty();
      var postsToAdd = [];
      for (var i = 0; i < posts.length; i++) {
        postsToAdd.push(createNewRow(posts[i]));
      }
      postContainer.append(postsToAdd);
    }
  
  // HTML THAT BUILDS A NEW POST
    function createNewRow(post) {
      var newPost = $("<div>");
      newPost.addClass("card");
      var newPostHeading = $("<div>");
      newPostHeading.addClass("card-header");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-default");
      var newPostTitle = $("<h2>");
      var newPostDate = $("<small>");
      var newPostCategory = $("<h5>");
      newPostCategory.text(post.category);
      newPostCategory.css({
        float: "right",
        "font-weight": "700",
        "margin-top":
        "-15px"
      });
      var newPostBody = $("<div>");
      newPostBody.addClass("card-body");
      var newPostBody = $("<p>");
      newPostTitle.text(post.title + " ");
      newPostBody.text(post.body);
      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      newPostDate.text(formattedDate);
      newPostTitle.append(newPostDate);
      newPostHeading.append(deleteBtn);
      newPostHeading.append(editBtn);
      newPostHeading.append(newPostTitle);
      newPostHeading.append(newPostCategory);
      newPostBody.append(newPostBody);
      newPost.append(newPostHeading);
      newPost.append(newPostBody);
      newPost.data("post", post);
      return newPost;
    }
  
  //  EDIT POST FUNCTION
    function handlePostEdit() {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
      window.location.href = "/cms?post_id=" + currentPost.id;
    }
  
    // IF NO POSTS MATCH THE SEARCH
    function displayEmpty() {
      postContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
      postContainer.append(messageH2);
    }
  
    // GET POSTS FROM ANOTHER CATEGORY
    function handleCategoryChange() {
      var newPostCategory = $(this).val();
      getPosts(newPostCategory);
    }
  
  });
  