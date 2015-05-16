/**
* @exports MessageStore
**/

var Promise = require('bluebird');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MessageConstants = require('../constants/MessageConstants');
var assign = require('object-assign');
var _ = require('lodash');
var TAFFY = require('node-taffydb').TAFFY;

var CHANGE_EVENT = 'change';

var _messages = TAFFY();

function initialize(messages) {
  _messages = TAFFY(messages);
}

/**
 * Create a Message.
 * @param  {object} message
 */
function createMessage(message) {
  console.log('MessageStore.createMessage', message);
  return new Promise(function(resolve, reject){

    window.io.socket.post('/messages', {
      message_thread_id: message.messageThread.id,
      username: message.authUser.username,
      text: message.text
    },
    function(message){
      // receiveCreatedMessageで保存するため自分が入力したテキストも保存は不要
      //_messages.insert(message);
      resolve(message);
    });

  });
}

function receiveCreatedMessage(message) {
  console.log('MessageStore.receiveCreated', message);
  _messages.insert(message);
}

function findOrCreateMessageThread(threadName) {

  console.log('MessageStore.findOrCreateMessageThread:prams: ', threadName);
  var err = new Error();
  console.log(err.stack);
  
  return new Promise(function(resolve, reject){

    window.io.socket.get('/messages/findMessageThread', {
      name: threadName
    },
    function(thread){
      console.log('MessageStore.findOrCreateMessageThread', thread);
      resolve(thread);
    });

  });
}

function findAllMessagesByThreadId(threadId){
  return new Promise(function(resolve, reject){

    window.io.socket.get('/messages', {message_thread_id: threadId}, function(messages){
      _messages = TAFFY(messages);
      resolve(getAllMessages());
    });

  });
}

function getAllMessages(){
  return _messages().order('createdAt desc').get();
}


var MessageStore = assign({}, EventEmitter.prototype, {

  initialize: function(messages){
    initialize(messages);
  },

  /**
   * Get the entire collection of Messages.
   * @return {object}
   */
  findAllMessagesByThreadId: function(threadId) {
    return findAllMessagesByThreadId(threadId);
  },

  getAllMessages: function() {
    return getAllMessages();
  },

  findMessageThread: function(threadName){
    return findOrCreateMessageThread(threadName);
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

        createMessage(action.message)
        .then(function(message){

          // ここでmessageを捨ててしまうのが勿体無いような…？
          MessageStore.emitChange();
        })
        .catch(function(err){
          console.log(err);
        });

      }
      break;

    case MessageConstants.MESSAGE_RECEIVE_CREATED:

      receiveCreatedMessage(action.message);
      MessageStore.emitChange();

      break;

    case MessageConstants.THREAD_FIND_OR_CREATE:

      if (action.name.trim() !== '') {
        findOrCreateMessageThread(action.name)
        .then(function(thread){
          return findAllMessagesByThreadId(thread.id);
        })
        .then(function(messages){
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
