$(document).ready(function() {

  app.init();

  $(document).on('click', '#submit-button', function(e) {
    e.preventDefault();
    app.handleSubmit();
  });

  $(document).on('click', '#refresh-button', function(e) {
    app.init();
  });

  $(document).on('click', '.username', function(e) {
    console.log('clicked document .username');
    app.handleUsernameClick.call($(this));
    $(this).parent().addClass('friend');
  });

  $('#message-form').keypress(function(e) {
    if (e.which === 13) {
      app.handleSubmit();
    }
  });

  $('#room-list').change(function(e) { 
    app.superRender($(this).val());
  });

  //Mocha Runner Specific
  $('#send').on('submit', function(e) {
    console.log('clicked #send');
    e.preventDefault();
    app.handleSubmit();
  });
  
});  