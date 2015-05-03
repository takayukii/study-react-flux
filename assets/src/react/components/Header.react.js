/**
* @exports Header
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserActions = require('../actions/UserActions');

// Storeは1回でもこのようにrequireしないとDispatcherに登録されないので注意
var UserStore = require('../stores/UserStore');

var Header = React.createClass({

  /**
  * @description コンポーネントの初期値を定義する
  * @return {object} State初期値
  **/
  getInitialState: function(){
    return {
      username: ''
    };
  },

  /**
   * @return {object}
   */
  render: function() {

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
              <li className="login">
                <div className="form-inline text-right">
                  <input type="text" className="form-control input-sm" onChange={this._onChange} value={this.state.text} />
                  <a href="#" onClick={this._onClick}><i className="fa fa-sign-in"></i> Login</a>
                </div>
              </li>
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
  _onChange: function(/*object*/ event) {
    this.setState({
      username: event.target.value
    });
  },

  /**
   * @description ボタン押下時にアクションを送出する
   * @param {object} event
   */
  _onClick: function(e) {
    e.preventDefault();
    UserActions.login(this.state.username, 'password');
  }

});

module.exports = Header;
