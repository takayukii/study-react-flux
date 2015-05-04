/**
* @exports MessageApp
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;

var MessageInputForm = require('./MessageInputForm.react');
var MessageList = require('./MessageList.react');
var MessageStore = require('../stores/MessageStore');

var MessageApp = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
     return {
      allMessages: [],
    };
  },

  componentDidMount: function() {
    this._findAndSetMessageState();
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
      <div className="message">
        <MessageInputForm authUser={this.props.authUser} />
        <MessageList
          allMessages={this.state.allMessages} authUser={this.props.authUser}
        />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this._findAndSetMessageState();
  },

  _findAndSetMessageState: function(){
    var self = this;

    MessageStore.getAll()
    .then(function(messages){
      self.setState({allMessages: messages});
    })
    .catch(function(err){
      console.log(err);
    });
  },

});

module.exports = MessageApp;