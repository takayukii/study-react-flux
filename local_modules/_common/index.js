var _Common = {

  getMessageThreadName: function(name1, name2){

    var threadName = null;
    
    if(name1 > name2){
      threadName = name2 + '-' + name1;
    }else{
      threadName = name1 + '-' + name2;
    }
    return threadName;
  }

};

module.exports = _Common;