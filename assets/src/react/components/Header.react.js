/**
* @exports Header
**/

var Promise = require('bluebird');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');

// Storeは1回でもこのようにrequireしないとDispatcherに登録されないので注意
var UserStore = require('../stores/UserStore');

var Header = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object.isRequired,
    onLogin: React.PropTypes.func.isRequired
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

  /**
  * @description コンポーネントマウント時にAjaxでユーザーの状態を取得する
  **/
  componentDidMount: function() {
    UserStore.addChangeListener(this._onStoreEvent);
    this._findAndSetUserState();
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onStoreEvent);
  },

  /**
   * @return {object}
   */
  render: function() {

    var loginNav = (
        <li className="login">
          <div className="form-inline text-right">
            <input type="text" className="form-control input-sm" onChange={this._onTextChange} value={this.state.text} />
            <a href="#" onClick={this._onButtonClick}><i className="fa fa-sign-in"></i> Login</a>
          </div>
        </li>
      );

    if(this.props.authUser){
      loginNav = (
          <ul className="nav navbar-nav">
            <li><a href="#">{this.props.authUser.username}</a></li>
          </ul>
        );
    }

    return (
      <div className="navbar navbar-inverse navbar-fixed-top sample-header" role="navigation">  
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">React Sample</a>
          </div>    
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
            </ul>
            <ul className="nav navbar-nav pull-right">
              {loginNav}
            </ul>    
          </div> 
        </div>
      </div>
    );

  },

  /**
   * @description 都度のテキスト入力に際して、this.setStateし値を更新しておく
   * @param {object} event
   */
  _onTextChange: function(/*object*/ event) {
    this.setState({
      username: event.target.value
    });
  },

  /**
   * @description ボタン押下時にアクションを送出する
   * @param {object} event
   */
  _onButtonClick: function(e) {
    e.preventDefault();
    UserActions.login(this.state.username, 'password');
  },

  _onStoreEvent: function() {
    this._findAndSetUserState();
  },

  _findAndSetUserState: function() {
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
