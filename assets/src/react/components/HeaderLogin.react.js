/**
* @exports HeaderLogin
**/

var Promise = require('bluebird');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

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
        <ul className="nav navbar-nav pull-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.authUser.username}</a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="#" onClick={this._onLogoutClick}>Logout</a></li>
            </ul>
          </li>
        </ul>
      );

    }else{
      
      return (
        <ul className="nav navbar-nav pull-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Login As <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="#" onClick={this._onLoginClick}>bob</a></li>
              <li><a href="#" onClick={this._onLoginClick}>joe</a></li>
            </ul>
          </li>
        </ul>
      );

    }

  },

  /**
   * @description Login Asを選択時にアクションを送出する
   * @param {object} event
   */
  _onLoginClick: function(/*object*/ event) {
    event.preventDefault();
    UserActions.login(event.target.textContent, 'password');
  },

  _onLogoutClick: function(/*object*/ event) {
    event.preventDefault();
    UserActions.logout();
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
