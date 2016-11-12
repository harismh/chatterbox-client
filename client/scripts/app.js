// YOUR CODE HERE:

var app = {};

app.data;

app.username = window.location.search.replace(/(&|\?)username=/, '');
//var mostRecent = app.data.results[0].createdAt; //
app.messages = [];

app.server = 'https://api.parse.com/1/classes/messages';

app.init = () => {
  app.fetch();

  app.clearMessages();
  
  var inner = function() {
    for (var i = app.data.results.length - 1; i > 0; i--) {
      app.renderMessage(app.data.results[i]);
    }
  };

  setTimeout(inner.bind(app), 500);

  // $.when( app.fetch() ).then(function() {
  //   //app.clearMessages();
  //   for (var i = app.data.results.length - 1; i > 0; i--) {
  //     app.renderMessage(app.data.results[i]);
  //   }
  // });

};

app.createMessage = (username, text) => {
  var message = {
    username: username,
    text: text,
    roomname: 'lobby',
    friends: []
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
      app.messages.push(message);
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
      app.data = data;
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
  // message.text = JSON.stringify(message.text);
  if (message.text === undefined) {
    return;
  }

  var regx = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;
  if (message.text.match(regx) !== null) {
    message.text = message.text.replace(regx, '');
  }

  var message = '<div class="chat ' + message.roomname + '">' + '<div class="username">' + message.username + '</div>' + '<div class="message">' + message.text + '</div>' + '</div>';

  $('#chats').prepend(message);
};

app.renderRoom = (string) => {
  app.fetch();
  app.clearMessages();
  var filtered = app.data.results.filter(message => message.roomname === string);
  
  for (var i = filtered.length - 1; i > 0; i--) {
    app.renderMessage(filtered[i]);
  }
};
