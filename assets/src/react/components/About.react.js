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
          <h1>React Messanger</h1>
          <p>メッセンジャーのサンプルです。右上の Login As からログインして、 Message To で送信相手を選択します。</p>
          <p>下記の技術を利用しています。</p>
          <ul>
            <li>Compass + SCSS</li>
            <li>Twitter Bootstrap 3</li>
            <li>React + flux</li>
            <li>React Router</li>
            <li>Server Side Rendering (React)</li>
            <li>Socket.io (Sails.io)</li>
            <li>Sails.js</li>
          </ul>
        </div>
      </div>
    );

  },

});

module.exports = App;
