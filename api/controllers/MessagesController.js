/**
 * MessagesController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require('bluebird');

module.exports = {

  findMessageThread: function(req, res){

    sails.log.info('findMessageThread start', req.body);

    var threadName = req.body.name;
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
      return res.json(thread);

    })
    .catch(function(err){
      sails.log.error(err);
      return res.send(500, err);
    })
  },

  create: function(req, res){
    sails.log.info('create start', req.body);

    Messages.create(req.body)
    .then(function(message){
      MessageThreads.publishUpdate(message.message_thread_id, message);
      return res.json(message);
    })
    .catch(function(err){
      sails.log.error(err);
      return res.send(500, err);
    });
  }

};

