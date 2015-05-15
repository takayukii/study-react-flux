var React = require('react');
var Router = require('react-router');
var routes = require('./routes')();

var initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
initialData = initialData || {};

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler authUser={initialData.authUser} messageThread={initialData.messageThread} allMessages={initialData.allMessages} />, document.getElementById('app'));
});
