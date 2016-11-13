$(document).ready(function() {

  app.superInit();

  $(document).on('click', '#submit-button', function(e) {
    e.preventDefault();
    app.superHandleSubmit();
  });

  $(document).on('click', '#refresh-button', function(e) {
    app.superInit();
  });

  $(document).on('click', '.username', function(e) {
    app.handleUsernameClick.call($(this));
    $(this).parent().addClass('friend');
  });

  $('#message-form').keypress(function(e) {
    if (e.which === 13) {
      app.superHandleSubmit();
    }
  });

  $('#room-list').change(function(e) { 
    app.superRender($(this).val());
  });
  
});  