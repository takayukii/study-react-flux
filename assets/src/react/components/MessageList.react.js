/**
* @exports MainSection
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');
var Message = require('./Message.react');

var MainSection = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object.isRequired,
    allMessages: ReactPropTypes.array.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {

    if (Object.keys(this.props.allMessages).length < 1) {
      return null;
    }

    var allMessages = this.props.allMessages;
    var messages = [];

    for (var key in allMessages) {
      messages.push(<Message authUser={this.props.authUser} key={key} message={allMessages[key]} />);
    }

    return (
      <ul>
        {messages}
      </ul>
    );
  },

});

module.exports = MainSection;