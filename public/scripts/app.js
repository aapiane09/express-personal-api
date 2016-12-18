console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var source = $('#handlebars-profile').html();
  var template = Handlebars.compile(source);
  var ajaxData = [];

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess (ajaxData) {
    console.log("Success!")
    // ajaxData.forEach(function (data){
      var profileHtml = template({profile : ajaxData});
      $('#profile').append(profileHtml);
    // });
  };

  function handleError (error) {
    console.log("Ajax Error!");
  }

});
