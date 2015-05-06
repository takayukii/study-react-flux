/**
* @exports App
**/

var React = require('react');

var HeaderApp = require('./HeaderApp.react');
var MessageApp = require('./MessageApp.react');

var App = React.createClass({

  getInitialState: function(){
    return {
      authUser: null,
      messageThread: null
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

              <MessageApp authUser={this.state.authUser} messageThread={this.state.messageThread} />

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
