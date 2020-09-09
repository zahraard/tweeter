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
      $("#tweets-container").append($tweet);
    }
  };
  
// Ajax call to read the tweets from db
  function loadTweets(){
    $.get('/tweets').then(data => {
      renderTweets(data);
    })
  }
  loadTweets()

  //Ajax call to post the new tweet
  $("form#tweet-form").on("submit", function(event){
    event.preventDefault();
    const data = $( "form" ).serialize();
    $.post('/tweets/', data).then((response)=>{
      console.log(response);
    }) 
  });
});
