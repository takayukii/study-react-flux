/**
* @exports HeaderMessageTo
**/

var Promise = require('bluebird');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');
var MessageStore = require('../stores/MessageStore');
var utils = require('my-utils');

var Header = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object,
    messageThread: ReactPropTypes.object,
    onChangeMessageThread: React.PropTypes.func
  },

  getInitialState: function() {
    var threadName = '';
    if(this.props.messageThread){
      threadName = this.props.messageThread.name;
    }
    return {
      threadName: threadName,
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
              <li><Link to="message" params={{userId: "bob"}} onClick={this._onChangeMessageThreadClick}>bob</Link></li>
              <li><Link to="message" params={{userId: "joe"}} onClick={this._onChangeMessageThreadClick}>joe</Link></li>
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

    if(this.props.authUser){
      
      var self = this;
      MessageStore.findMessageThread(this.state.threadName)
      .then(function(thread){
        self.props.onChangeMessageThread(thread);
      });

    }else{
      this.props.onChangeMessageThread(null);
    }

  },

  _onChangeMessageThreadClick: function(/*object*/ event){

    var threadName = utils.getMessageThreadName(this.props.authUser.username, event.target.textContent);
    this.setState({threadName: threadName});
    MessageActions.findOrCreateMessageThread(threadName);
    
  },

});

module.exports = Header;
