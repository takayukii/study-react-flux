/**
* @exports Header
* @description 文字入力欄の画面コンポーネント
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');

var Header = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object,
    messageThread: ReactPropTypes.object
  },

  /**
  * @description コンポーネントの初期値を定義する
  * @return {object} State初期値
  **/
  getInitialState: function(){
    return {
      text: ''
    };
  },

  /**
   * @description ヘッダー画面のレイアウト定義
   * @return {object}
   */
  render: function() {

    if(!this.props.messageThread){
      return null;
    }

    var self = this;
    var messageTo = null;
    members = this.props.messageThread.name.split(/-/);
    members.forEach(function(member){
      if(self.props.authUser.username !== member){
        if(!messageTo){
          messageTo = String() + member;
        }else{
          messageTo += ', ' + member;
        }
      }
    })
    if(!messageTo){
      messageTo = 'myself';
    }

    var textareaStyle = {
      'overflow': 'hidden',
      'word-wrap': 'break-word',
      'resize': 'none',
      'height': '62px'
    };

    return (
      <div className="thread-list-item">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2 col-md-10 col-md-offset-1">
            <div className="panel message-text clearfix">

              <h4 className="message-to">To: {messageTo}</h4>
              <textarea onChange={this._onTextChange} value={this.state.text} 
                style={textareaStyle} placeholder="先方にメッセージをご記入ください。" />
              <div className="pull-right">
                <input type="submit" className="btn btn-primary" value="メッセージを送信" onClick={this._onButtonClick} />
              </div>

            </div>
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
      text: event.target.value
    });
  },

  /**
   * @description ボタン押下時にアクションを送出する
   * @param {object} event
   */
  _onButtonClick: function(e) {

    MessageActions.createMessage({
      authUser: this.props.authUser, 
      messageThread: this.props.messageThread,
      text: this.state.text
    });
    this.setState({text: ''});
    
  }

});

module.exports = Header;
