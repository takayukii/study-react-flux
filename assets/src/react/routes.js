var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/App.react');
var MessageApp = require('./components/MessageApp.react');
var About = require('./components/About.react');

module.exports = function() {
  return (
    <Route handler={App} path="/">
      <Route name="message" path="/message/:userId" handler={MessageApp} />
      <Route name="about" path="/about" handler={About} />
    </Route>
  );
};