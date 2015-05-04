/**
* @exports UserStore
**/

var Promise = require('bluebird');
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
  return new Promise(function(resolve, reject){

    agent
    .post('/auth/login')
    .send({
      username: username,
      password: password
    })
    .set('Accept', 'application/json')
    .end()
    .then(function(res){
      resolve(JSON.parse(res.text));
    })
    .catch(function(err){
      console.log(err);
      reject(err);
    });

  });
}

var UserStore = assign({}, EventEmitter.prototype, {

  me: function(){
    return new Promise(function(resolve, reject){

      agent
      .get('/auth/me')
      .set('Accept', 'application/json')
      .end()
      .then(function(res){
        resolve(JSON.parse(res.text));
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
UserStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case UserConstants.USER_LOGIN:
    
      login(action.username.trim(), action.password)
      .then(function(user){
        UserStore.emitChange();
      }).catch(function(err){
        console.log('login', err);
      });
      break;

    default:
      // no op
  }
});

module.exports = UserStore;
