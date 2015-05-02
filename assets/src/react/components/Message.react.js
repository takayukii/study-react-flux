/**
* @exports Message
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');
var TimeAgo = React.createFactory(require('react-timeago'));

var Message = React.createClass({

  propTypes: {
   message: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {

    var datetime = String() + this.props.message.datetime;
    var messages = this.props.message.text.split("\n");
    var paragraphs = [];
    messages.forEach(function(message){
      paragraphs.push(<p>{message}</p>);
    });

    var timeago = TimeAgo({
      date: this.props.message.datetime,
      formatter: function(value, unit, exp){

        if(unit === 'second'){
          return 'ちょうど今';
        }else{
          var _unit = null;
          var _exp = null;
          switch(unit){
            case 'minute':
              _unit = '分';
              _exp = '前';
              break;
            case 'hour':
              _unit = '時間';
              _exp = '前';
              break;
            case 'day':
              _unit = '日';
              _exp = '前';
              break;
            case 'week':
              _unit = '週間';
              _exp = '前';
              break;
            case 'month':
              _unit = 'ヶ月';
              _exp = '前';
              break;
            case 'year':
              _unit = '年';
              _exp = '前';
              break;
          }
          return String() + value + _unit + _exp;
        }

      }
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
                <div className="clearfix">
                  <div className="message-text">{paragraphs}</div>
                  <p className="pull-right datetime"><a title={datetime}>{timeago}</a></p>
                </div>
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
                <div className="clearfix">
                  <div className="message-text">{paragraphs}</div>
                  <p className="pull-right datetime"><a title={datetime}>{timeago}</a></p>
                </div>
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
