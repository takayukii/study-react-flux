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
          <p>This boilerplate project includes following technologies to study frontend web development</p>
          <ul>
            <li>SCSS - CSS pre-processor</li>
            <li>Compass - CSS framework based on SASS/SCSS</li>
            <li>React - View Component JS framework which is getting popular rapidly</li>
            <li>flux - Frontend framework / architecture which well woking with React</li>
            <li>React Router - Router Component for React</li>
            <li>Server Side Rendering - One of awesome capabilities of React</li>
          </ul>
          <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
        </div>
      </div>
    );

  },

});

module.exports = App;
