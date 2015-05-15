/**
 * ServerRenderController
 *
 * @description :: Server-side logic for managing Serverrenders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var React   = require('react'),
    Router  = require('react-router'),
    Route   = Router.Route,
    Promise = require('bluebird'),
    _Common = require('_common')
;
require('node-jsx').install();

var App = require('../../assets/src/react/components/App.react');
var MessageApp = require('../../assets/src/react/components/MessageApp.react');
var About = require('../../assets/src/react/components/About.react');

var routes = require('../../assets/src/react/routes')();

module.exports = {

  about: function(req, res, next){

    var data = {authUser: req.session.user};

    Router.run(routes, req.path, function(Handler) {
      res.view('serverrendering', {
        markup: React.renderToString(
          React.createElement(Handler, data)
        ),
        initialData: JSON.stringify(data)
      });
    });

  },

  message: function(req, res, next){

    if(req.session.user){

      var threadName = _Common.getMessageThreadName(req.session.user.username, req.params.userName);

      // TODO 重複コード
      MessageThreads.find({name: threadName})
      .then(function(thread){
        return new Promise(function(resolve, reject){

          if(thread.length > 0){
            resolve(thread[0]);
          }else{
            MessageThreads.create({name: threadName})
            .then(function(thread){
              resolve(thread);
            })
            .catch(function(err){
              reject(err);
            });
          }

        });
      })
      .then(function(thread){

        MessageThreads.subscribe(req.socket, thread.id);

        Messages.find({message_thread_id: thread.id}).sort("createdAt DESC")
        .then(function(messages){
          Router.run(routes, req.path, function(Handler) {
            var data = {authUser: req.session.user, messageThread: thread, allMessages: messages};
            res.view('serverrendering', {
              markup: React.renderToString(
                React.createElement(Handler, data)
              ),
              initialData: JSON.stringify(data)
            });

          });
        })
        .catch(function(err){
          throw err;
        });

      })
      .catch(function(err){
        sails.log.error(err);
        return res.send(500, err);
      });

    }else{

      Router.run(routes, req.path, function(Handler) {
        var data = {authUser: req.session.user};
        res.view('serverrendering', {
          markup: React.renderToString(
            React.createElement(Handler, data)
          ),
          initialData: JSON.stringify(data)
        });

      });

    }

  }
	
};

