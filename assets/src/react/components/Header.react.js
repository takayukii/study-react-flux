/**
* @exports Header
* @description 文字入力欄の画面コンポーネント
**/

var React = require('react');
var MessageActions = require('../actions/MessageActions');

var Header = React.createClass({

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

              <textarea onChange={this._onChange} value={this.state.text} 
                style={textareaStyle} placeholder="先方にメッセージをご記入ください。" />
              <div className="pull-right">
                <input type="submit" className="btn btn-primary" value="メッセージを送信" onClick={this._onClick} />
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
  _onChange: function(/*object*/ event) {
    this.setState({
      text: event.target.value
    });
  },

  /**
   * @description ボタン押下時にアクションを送出する
   * @param {object} event
   */
  _onClick: function(e) {
    console.log('_onClick:', this.state.text);
    MessageActions.create(this.state.text, new Date());
  }

});

module.exports = Header;
