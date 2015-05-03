var React = require('react');

var Header = require('./components/Header.react');
var MessageApp = require('./components/MessageApp.react');

React.render(
  <Header />,
  document.getElementById('header')
);

React.render(
  <MessageApp />,
  document.getElementById('messageapp')
);
