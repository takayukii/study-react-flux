/**
* @exports HeaderLogin
**/

var Promise = require('bluebird');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var Header = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object,
    onLogin: React.PropTypes.func
  },

  /**
  * @description コンポーネントの初期値を定義する
  * @return {object} State初期値
  **/
  getInitialState: function(){
    return {
      authUser: this.props.authUser
    };
  },

  componentDidMount: function() {
    this._syncAuth();
    UserStore.addChangeListener(this._onStoreEvent);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onStoreEvent);
  },

  /**
   * @return {object}
   */
  render: function() {

    if(this.props.authUser){
      
      return (
        <Nav navbar right>
          <DropdownButton inverse eventKey={3} title={this.props.authUser.username}>
            <MenuItem eventKey='logout' onSelect={this._onSelect}>Logout</MenuItem>
          </DropdownButton>
        </Nav>
      );

    }else{
      
      return (
        <Nav navbar right>
          <DropdownButton inverse eventKey={3} title='Login As'>
            <MenuItem eventKey='bob' onSelect={this._onSelect}>bob</MenuItem>
            <MenuItem eventKey='joe' onSelect={this._onSelect}>joe</MenuItem>
          </DropdownButton>
        </Nav>
      );

    }

  },

  _onSelect: function(selected){

    if(selected === 'logout'){
      UserActions.logout();
    }else{
      UserActions.login(selected, 'password');
    }

  },

  _onStoreEvent: function() {
    this._syncAuth();
  },

  _syncAuth: function() {
    var self = this;

    UserStore.me()
    .then(function(user){
      if (self.isMounted()) {
        self.props.onLogin(user);
      }
    })
    .catch(function(err){
      if (self.isMounted()) {
        self.props.onLogin(null);
      }
    });
  },

});

module.exports = Header;
