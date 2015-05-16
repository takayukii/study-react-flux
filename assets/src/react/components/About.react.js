/**
* @exports About
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;

var App = React.createClass({

  /**
   * @return {object}
   */
  render: function() {

    return (
      <div className="about">
        <div className="jumbotron mission">
          <h1>React Messanger Sample</h1>
          <p>メッセンジャーのサンプルです。右上の Login As からログインして、 Message To で送信相手を選択します。</p>
        </div>
      </div>
    );

  },

});

module.exports = App;
