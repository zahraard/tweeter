$(function(){
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  function createTweetElement(tweet){
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
  </article>`)
  return $tweet;
  }
  const renderTweets = function(tweets) {
    let $tweet;
    for (const tweet of tweets){
      console.log(tweet)
      $tweet = createTweetElement(tweet);
      $('.tweets-container').append($tweet);
    }
  }

  renderTweets(data);
})

