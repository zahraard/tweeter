$(function () {
  function createTweetElement(tweet) {
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
      <p class="published-date">10 days ago</p>
      <span>
        <img src="/images/flag24.png">
        <img src="/images/retweet30px.png">
        <img src="/images/heart.png">
      </span>
    </footer>
  </article>`);
    return $tweet;
  }
  const renderTweets = function (tweets) {
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
  $("form").on("submit", function (event) {
    event.preventDefault();
    const text = event.target.text.value;
    if (text === "") {
      alert("Your tweet needs text!!");
    } else if (text.length > 140) {
      alert("Your tweet content is too long!!");
    } else {
      const formData = $("form").serialize();
      const data = escape(formData)
      console.log(data)
      $.post("/tweets/", data)
        .then((response) => {
          loadTweets();
          $("form")[0].reset();
          $(".counter").html('<strong>140</strong>')
        })
        .catch((err) => console.log(err));
    }
  });
  
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

});
