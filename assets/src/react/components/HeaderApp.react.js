/**
* @exports HeaderApp
**/

var Promise = require('bluebird');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ReactPropTypes = React.PropTypes;
var UserStore = require('../stores/UserStore');

var HeaderLogin = require('./HeaderLogin.react');
var HeaderMessageTo = require('./HeaderMessageTo.react');

var Header = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object,
    messageThread: ReactPropTypes.object,
    onLogin: React.PropTypes.func,
    onChangeMessageThread: React.PropTypes.func
  },

  /**
   * @return {object}
   */
  render: function() {

    return (
      <div className="navbar navbar-inverse navbar-fixed-top sample-header" role="navigation">  
        <div className="container">
          <div className="navbar-header brand">
            <Link to="about">React Messanger Sample</Link>
          </div>
          <div className="collapse navbar-collapse">
            <HeaderMessageTo authUser={this.props.authUser} messageThread={this.messageThread} onChangeMessageThread={this.props.onChangeMessageThread} />
            <HeaderLogin authUser={this.props.authUser} onLogin={this.props.onLogin} />
          </div> 
        </div>
      </div>
    );

  },


});

module.exports = Header;
