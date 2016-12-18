console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var source = $('#handlebars-profile').html();
  var template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    dataType: "json",
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess (data) {
    console.log("Success!")
    // data.forEach(function (data){
    //   var profileHtml = template({profile : data});
    //   $('#profile').append(profileHtml);
    // });
  };

  function handleError (error) {
    console.log("Ajax Error!");
  }

});
