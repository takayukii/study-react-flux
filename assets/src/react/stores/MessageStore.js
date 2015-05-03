/**
* @exports MessageStore
**/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MessageConstants = require('../constants/MessageConstants');
var assign = require('object-assign');
var _ = require('lodash');
var agent = require('superagent-promise');

var CHANGE_EVENT = 'change';

var _messages = {};

/**
 * Create a Message.
 * @param  {string} text The content of the TODO
 */
function create(text, datetime) {

  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _messages[id] = {
    id: id,
    text: text,
    datetime: datetime
  };

  agent
  .post('/messages')
  .send({
    id: id,
    text: text,
    datetime: datetime
  })
  .set('Accept', 'application/json')
  .end()
  .then(function(res){
    console.log('res', res);
  })
  .catch(function(err){
    console.log(err);
  });

}

/**
 * Update a Message.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _messages[id] = assign({}, _messages[id], updates);
}

/**
 * Delete a Message.
 * @param  {string} id
 */
function destroy(id) {
  delete _messages[id];
}

var MessageStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of Messages.
   * @return {object}
   */
  getAll: function() {

    var sorted = _.sortBy(_messages, function(message){
      return -message.datetime;
    });

    return sorted;
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
  var text;

  switch(action.actionType) {
    case MessageConstants.MESSAGE_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text, action.datetime);
        MessageStore.emitChange();
      }
      break;

    case MessageConstants.MESSAGE_UPDATE:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        MessageStore.emitChange();
      }
      break;

    case MessageConstants.MESSAGE_DESTROY:
      destroy(action.id);
      MessageStore.emitChange();
      break;

    case MessageConstants.MESSAGE_AGING:
      aging();
      MessageStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = MessageStore;
