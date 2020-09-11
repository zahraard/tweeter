$(function() {
  //render time using moment.js
  const renderTime = function(tweet) {
    return moment(tweet.created_at).fromNow();
  };

  //create template for new tweet
  function createTweetElement(tweet) {
    const time = renderTime(tweet);
    const $tweet = $(`<article class="tweet">
    <header>
      <div>
        <img src=${tweet.user.avatars}>
        <span>${tweet.user.name}</span>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <div class="tweet-content">
      <p>${tweet.content.text}</p>
    </div>
    <footer>
      <p class="published-date">${time}</p>
      <span id="tweet-icons">
        <img src="/images/flag24.png">
        <img src="/images/retweet30px.png">
        <img src="/images/heart.png">
      </span>
    </footer>
  </article>`);
    return $tweet;
  }

  //loop through the array of tweets
  const renderTweets = function(tweets) {
    let $tweet;
    for (const tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  // Ajax call to read the tweets from db
  function loadTweets() {
    $.get("/tweets")
      .then((data) => {
        $("#tweets-container").empty();
        renderTweets(data);
      })
      .catch((err) => console.log(err));
  }
  loadTweets();

  //Ajax call to post the new tweet
  $("form").on("submit", function(event) {
    event.preventDefault();
    const text = event.target.text.value;
    if (text === "") {
      $(".error").html("Error: Tweet can't be empty!!").css("display", "block");
      setTimeout(() => {
        $(".error").css("display", "none");
      }, 4000);
    } else if (text.length > 140) {
      $(".error")
        .html("Error: Your tweet content is too long!!")
        .css("display", "block");
      setTimeout(() => {
        $(".error").css("display", "none");
      }, 4000);
    } else {
      const formData = $("form").serialize();
      const data = escape(formData);
      console.log(data);
      $.post("/tweets/", data)
        .then(() => {
          loadTweets();
          $("form")[0].reset();
          $(".counter").html("<strong>140</strong>");
        })
        .catch((err) => console.log(err));
    }
  });

  //Transform user input to prevent sending script to server
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Toggle the new tweet section by clicking on the button on top right corner of the page
  $(".nav-right-text").on("click", () => {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });
});
