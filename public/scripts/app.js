console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: 'https://blooming-hamlet-27001.herokuapp.com/api/profile',
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess (data) {
    var source = $('#handlebars-profile').html();
    var template = Handlebars.compile(source);
    var profileHtml = template(data);
    $('#profile').append(profileHtml);

  }

  function handleError (error) {
    console.log("Ajax Error!");
  }

});
