var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.react');
var MessageApp = require('./components/MessageApp.react');
var About = require('./components/About.react');

module.exports = function() {
  console.log('★DefaultRoute仕込んだ');
  return (
    <Route handler={App} path="/">
      <DefaultRoute handler={About}/>
      <Route name="message" path="/message/:userId" handler={MessageApp} />
      <Route name="about" path="/about" handler={About} />
    </Route>
  );
};
