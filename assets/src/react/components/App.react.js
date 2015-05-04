/**
* @exports App
**/

var React = require('react');

var Header = require('./Header.react');
var MessageApp = require('./MessageApp.react');

var App = React.createClass({

  getInitialState: function(){
    return {
      authUser: null
    };
  },

  /**
   * @return {object}
   */
  render: function() {

    return (
      <div>
        <Header authUser={this.state.authUser} onLogin={this.login} />
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">

              <MessageApp authUser={this.state.authUser} />
              
            </div>
          </div>
        </div>
      </div>
    );

  },

  login: function(user){
    this.setState({
      authUser: user
    });
  }

});

module.exports = App;
