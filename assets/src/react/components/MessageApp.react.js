/**
* @exports MessageApp
**/

var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
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
        <Header />
        <MainSection
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