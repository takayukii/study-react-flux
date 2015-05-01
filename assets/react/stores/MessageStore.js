var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MessageConstants = require('../constants/MessageConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _messages = {};

/**
 * Create a Message.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _messages[id] = {
    id: id,
    text: text
  };
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
    return _messages;
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
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case MessageConstants.MESSAGE_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
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

    default:
      // no op
  }
});

module.exports = MessageStore;
