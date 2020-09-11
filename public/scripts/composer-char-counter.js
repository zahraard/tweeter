$(document).ready(function() {
  $('#tweet-text').on('keyup', function(event){
    let charLen = this.value.length;
    let remain = 140 - charLen;
    const counter = $(this).parent().find('.counter');
    if(remain < 0){
      counter.addClass('red');
    }
    if(remain > 0){
      counter.removeClass('red');
    }
    counter.val(remain)
  });

  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn();
        $('.right-text').fadeOut();
    } else {
        $('.scrollToTop').fadeOut();
        $('.right-text').fadeIn();
    }
});

//Click event to scroll to top
$('.scrollToTop').click(function(){
  $('.new-tweet').slideDown();
    $('#tweet-text').focus();
    $('html, body').animate({scrollTop : 0});
    
    return false;
});
});