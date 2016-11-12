// YOUR CODE HERE:

var app = {};

app.data;

app.username = window.location.search.replace(/(&|\?)username=/, '');

app.friends = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = () => {
  app.fetch();

  app.clearMessages();

};

app.createMessage = (username, text) => {
  var message = {
    username: username,
    text: text,
    roomname: 'lobby',
  };
  return message;
};

app.send = (message) => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.renderMessage(message);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = () => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    type: 'GET',
    url: 'https://api.parse.com/1/classes/messages',
    data: 'order=-createdAt',
    success: function (data) {
      console.log('chatterbox: Fetch successful');
      var data = data.results;
      for (var i = 0; i < data.length; i++) {
        app.renderMessage(data[i]);  
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Fetch failed', data);
    }
  });  
};

app.clearMessages = () => {
  $('#chats').html('');
};

app.renderMessage = (message) => {
  if (message.text === undefined) {
    return;
  }

  var regx = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;
  if (message.text.match(regx) !== null) {
    message.text = message.text.replace(regx, 'WARNING MALICIOUS CODE');
  }

  var message = `<div id="send" class="chat" ${message.roomname}><div class="username">${message.username}</div><div class="message">${message.text}</div></div>`;

  $('#chats').prepend(message);
  $('#main').append(message);
};

app.renderRoom = (string) => {
  //$('#roomSelect').children().replaceWith(`<div id=${string}></div>`);
  $('#roomSelect').append(`<div id=${string}></div>`);
};

app.handleUsernameClick = function() {
  var username = $(this).text();
  app.friends[username] = username;    
};

app.handleSubmit = function () {
  var text = $('#message-form').val();
  var username = app.username;
  var message = app.createMessage(username, text);
  app.send(message);
  $('#message-form').val('');
};