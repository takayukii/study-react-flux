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

var Navbar = require('react-bootstrap/lib/Navbar');
var CollapsibleNav = require('react-bootstrap/lib/CollapsibleNav');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

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
      <Navbar brand={<Link to="about">React Messanger</Link>} inverse toggleNavKey={0}>
        <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
          <HeaderMessageTo authUser={this.props.authUser} messageThread={this.props.messageThread} onChangeMessageThread={this.props.onChangeMessageThread} />
          <HeaderLogin authUser={this.props.authUser} onLogin={this.props.onLogin} />
        </CollapsibleNav>
      </Navbar>
    );

  },


});

module.exports = Header;
