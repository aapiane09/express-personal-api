console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var source = $('#profile-template').html();
  var gamesSource = $('#games-template').html();
  var template = Handlebars.compile(source);
  var gamesTemplate = Handlebars.compile(gamesSource);
  var ajaxData = [];
  // var ajaxGamesData = []; //Because it is a global variable, if it is redefined within a function, is it only redifined in the scope of that function?

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess (ajaxData) {
    console.log("Profile Success!")
    var profileHtml = template({profile : ajaxData});
    console.log("Profile HTML", profileHtml)
    $('#profile').append(profileHtml);
  };

  function handleError (error) {
    console.log("Ajax Error!");
  }

  $('#games').click(function(){
    $.ajax({
      method: 'GET',
      url: '/api/games',
      success: handleGamesSuccess,
      error: handleError
    });

    function handleGamesSuccess (ajaxGamesData) {
      console.log("Games Success!", ajaxGamesData)
      var gamesHtml = gamesTemplate({games : ajaxGamesData});
      console.log("Games HTML", gamesHtml)
      ajaxGamesData.forEach (function (){
        $('#append-info').append(gamesHtml);
        console.log("Appending!")
      });
    };
  });

  $('#suggest').click(function(){
    $('#append-info').html('<form class="form-inline"><div class="form-group"><label for="exampleInputName2">Suggestion</label><input type="text" class="form-control" id="exampleInputName2" placeholder="What should I check out?"></div><select class="form-control"><option>Games</option></select><button type="submit" class="btn btn-default">Submit</button></form>');
  });


});
