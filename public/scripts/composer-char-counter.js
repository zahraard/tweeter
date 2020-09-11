$(function() {
  //Check the length of text and add class "red" if bigger than 140
  $("#tweet-text").on("keyup", function() {
    let charLen = this.value.length;
    let remain = 140 - charLen;
    const counter = $(this).parent().find(".counter");
    if (remain < 0) {
      counter.addClass("red");
    }
    if (remain >= 0) {
      counter.removeClass("red");
    }
    counter.val(remain);
  });

  //Show scroll arrow and hide nav arrow if user scrolls down and vise versa
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".scrollToTop").fadeIn();
      $(".nav-right-text").fadeOut();
    } else {
      $(".scrollToTop").fadeOut();
      $(".nav-right-text").fadeIn();
    }
  });

  //Click event to scroll to top
  $(".scrollToTop").click(function() {
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();
    $("html, body").animate({ scrollTop: 0 });
  });
});
