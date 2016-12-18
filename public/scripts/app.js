console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var source = $('#handlebars-profile').html();
  var template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: 'https://blooming-hamlet-27001.herokuapp.com/api/profile',
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess (data) {
    data.forEach(function (data){
      var profileHtml = template({profile : data});
      $('#profile').append(profileHtml);
    });
  };

  function handleError (error) {
    console.log("Ajax Error!");
  }

});
