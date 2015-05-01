var React = require('react');
var ReactPropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');

var Message = React.createClass({

  propTypes: {
   message: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {

    var messages = this.props.message.text.split("\n");
    var paragraphs = [];
    messages.forEach(function(message){
      paragraphs.push(<p>{message}</p>);
    });

    if(/mine/.test(this.props.message.text)){
      return (
        <div className="thread-list-item">
          <div className="row">
            <div className="col-xs-2 col-md-1 text-center">
              <a className="photo-round" href="#">
                <img src={'https://a2.muscache.com/ic/users/24725606/profile_pic/1418303411/original.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=36:*&output-format=jpg&output-quality=70'} />
              </a>
            </div>
            <div className="col-xs-8 col-md-10">
              <div className="panel panel-quote-left">
                <div className="message-text">{paragraphs}</div>
              </div>
            </div>
          </div>
        </div>
      );      
    }else{
      return (
        <div className="thread-list-item">
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 col-md-10 col-md-offset-1">
              <div className="panel panel-quote-right">
                <div className="message-text">{paragraphs}</div>
              </div>
            </div>
            <div className="col-xs-2 col-md-1 text-center">
              <a className="photo-round" href="#">
                <img src={'https://a2.muscache.com/ic/users/24725606/profile_pic/1418303411/original.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=36:*&output-format=jpg&output-quality=70'} />
              </a>
            </div>
          </div>
        </div>
      );
    }

  },

});

module.exports = Message;
