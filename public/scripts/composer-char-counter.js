$(document).ready(function() {
  $('#tweet-text').on('keyup', function(event){
    console.log(event.target.value.length)
    let charLen = this.value.length;
    let remain = 140 - charLen;
    const counter = $(this).parent().find('.counter');
    if(remain < 0){
      counter.addClass('red');
    }
    counter.val(remain)
  })
});