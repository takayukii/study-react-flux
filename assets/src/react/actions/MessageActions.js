/**
* @exports MessageAction
**/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageConstants = require('../constants/MessageConstants');

var MessageActions = {

  /**
   * @param  {object} message
   */
  create: function(message) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_CREATE,
      message: message
    });
  },

};

module.exports = MessageActions;
