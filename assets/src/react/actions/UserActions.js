/**
* @exports UserActions
**/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  /**
   * @param {string} id
   * @param {string} password
   */
  login: function(username, password) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_LOGIN,
      username: username,
      password: password
    });
  },

};

module.exports = UserActions;
