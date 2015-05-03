/**
* @exports MessageApp
**/

var MessageInputForm = require('./MessageInputForm.react');
var MessageList = require('./MessageList.react');
var React = require('react');
var MessageStore = require('../stores/MessageStore');

function getMessageState() {
  return {
    allMessages: MessageStore.getAll(),
  };
}

var MessageApp = React.createClass({

  getInitialState: function() {
    return getMessageState();
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <MessageInputForm />
        <MessageList
          allMessages={this.state.allMessages}
        />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getMessageState());
  }

});

module.exports = MessageApp;