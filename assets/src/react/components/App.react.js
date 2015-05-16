/**
* @exports App
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var HeaderApp = require('./HeaderApp.react');
var MessageApp = require('./MessageApp.react');

var App = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object,
    messageThread: ReactPropTypes.object,
    allMessages: ReactPropTypes.array
  },

  getInitialState: function(){
    return {
      authUser: this.props.authUser,
      messageThread: this.props.messageThread
    };
  },

  componentDidMount: function() {

    // ここで本来はAppActions的なものを送出すべきか…？

    window.io.socket.on('connect', function(){
      console.log('socket connect..');
    });
    window.io.socket.on('disconnect', function(){
      console.log('socket disconnect..');
    });
    window.io.socket.on('error', function(){
      console.log('socket error..');
    });

  },

  /**
   * @return {object}
   */
  render: function() {

    return (
      <div>
        <HeaderApp authUser={this.state.authUser} messageThread={this.state.messageThread} onLogin={this.login} onChangeMessageThread={this.changeMessageThread} />
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">

              <RouteHandler authUser={this.state.authUser} messageThread={this.state.messageThread} allMessages={this.props.allMessages} />

            </div>
          </div>
        </div>
      </div>
    );
  },

  login: function(/*object*/ user){
    this.setState({
      authUser: user
    });
  },

  changeMessageThread: function(/*object*/ messageThread){
    this.setState({
      messageThread: messageThread
    });
  }

});

module.exports = App;
