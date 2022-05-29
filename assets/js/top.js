$(document).ready(function(){
  $(window).scroll(function(){
    if($(this).scrollTop() > 150){
      $('#topButton').fadeIn();
    }
    else{
      $('#topButton').fadeOut();
    }
  });

  $('#topButton').click(function(){
    $('html ,body').animate({scrollTop: 0}, 800);
  });
});
