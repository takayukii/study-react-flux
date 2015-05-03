/**
* @exports UserStore
**/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');
var _ = require('lodash');
var agent = require('superagent-promise');

var CHANGE_EVENT = 'change';

/**
 * Create a Message.
 * @param  {string} text The content of the TODO
 */
function login(username, password) {

  agent
  .post('/auth/login')
  .send({
    username: username,
    password: password
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

var UserStore = assign({}, EventEmitter.prototype, {

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
UserStore.dispatchToken = AppDispatcher.register(function(action) {

  var username;
  switch(action.actionType) {
    case UserConstants.USER_LOGIN:
      username = action.username.trim();
      if (username !== '') {
        login(username, action.password);
        UserStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = UserStore;
