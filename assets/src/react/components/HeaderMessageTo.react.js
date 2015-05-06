/**
* @exports HeaderMessageTo
**/

var Promise = require('bluebird');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');
var MessageStore = require('../stores/MessageStore');

var Header = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object,
    messageThread: ReactPropTypes.object,
    onChangeMessageThread: React.PropTypes.func
  },

  getInitialState: function() {
     return {
      threadName: '',
    };
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._syncMessageThread);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._syncMessageThread);
  },

  /**
   * @return {object}
   */
  render: function() {

    if(this.props.authUser){
      
      return (
        <ul className="nav navbar-nav">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Message To <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="#" onClick={this._onChangeMessageThreadClick}>bob</a></li>
              <li><a href="#" onClick={this._onChangeMessageThreadClick}>joe</a></li>
            </ul>
          </li>
        </ul>
      );

    }else{
      
      return (
        <ul className="nav navbar-nav">
        </ul>
      );

    }

  },

  _syncMessageThread: function(){

    var self = this;
    if(this.props.authUser){
      
      MessageStore.findMessageThread(this.state.threadName)
      .then(function(thread){
        self.props.onChangeMessageThread(thread);
      });

    }else{
      self.props.onChangeMessageThread(null);
    }

  },

  _onChangeMessageThreadClick: function(/*object*/ event){

    event.preventDefault();

    var threadName = null;
    
    if(this.props.authUser.username > event.target.textContent){
      threadName = event.target.textContent + '-' + this.props.authUser.username;
    }else{
      threadName = this.props.authUser.username + '-' + event.target.textContent;
    }
    this.setState({threadName: threadName});
    MessageActions.findOrCreateMessageThread(threadName);
  },

});

module.exports = Header;
