var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageConstants = require('../constants/MessageConstants');

var MessageActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  update: function(id, text) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_UPDATE,
      id: id,
      text: text
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_DESTROY,
      id: id
    });
  },

};

module.exports = MessageActions;
