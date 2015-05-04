/**
* @exports MessageStore
**/

var Promise = require('bluebird');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MessageConstants = require('../constants/MessageConstants');
var assign = require('object-assign');
var _ = require('lodash');
var agent = require('superagent-promise');

var CHANGE_EVENT = 'change';

var _messages = [];

/**
 * Create a Message.
 * @param  {string} text The content of the TODO
 */
function create(message) {

  return new Promise(function(resolve, reject){

    agent
    .post('/messages')
    .send({
      username: message.authUser.username,
      text: message.text,
      datetime: message.datetime
    })
    .set('Accept', 'application/json')
    .end()
    .then(function(res){
      var message = JSON.parse(res.text);
      _messages.push(message);
      resolve(message);
    })
    .catch(function(err){
      console.log(err);
      reject(err);
    });

  });

}

var MessageStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of Messages.
   * @return {object}
   */
  getAll: function() {

    return new Promise(function(resolve, reject){

      agent
      .get('/messages')
      .set('Accept', 'application/json')
      .end()
      .then(function(res){

        console.log(res.text);
        var messages = JSON.parse(res.text);

        var sorted = _.sortBy(messages, function(message){
          return -message.datetime;
        });
        
        _messages = sorted;
        resolve(sorted);
      })
      .catch(function(err){
        console.log(err);
        reject(err);
      });

    });

  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  
});

// Register callback to handle all updates
MessageStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case MessageConstants.MESSAGE_CREATE:
      if (action.message.text.trim() !== '') {
        create(action.message)
        .then(function(message){
          MessageStore.emitChange();
        })
        .catch(function(err){
          console.log(err);
        });
      }
      break;

    default:
      // no op
  }
});

module.exports = MessageStore;
