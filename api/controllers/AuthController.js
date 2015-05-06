/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

  login: function(req, res) {

    sails.log.info('login start', req.params);

    passport.authenticate('local', function(err, user, info){
      if ((err) || (!user)){
        sails.log.warn('ログインに失敗しました', err, user, info);
        return res.send(500);
      }
 
      req.logIn(user, function(err){

        if(err){
          sails.log.warn('ログインに失敗しました', err, user, info);
          return res.send(500);
        }

        // ログインしたユーザー情報をセッションに保持する
        req.session.user = user;
        req.session.authenticated = true;
        
        return res.json(user);
      });

    })(req, res);
  },

  me: function(req, res){
    sails.log.info('me start');
    if(req.session.user){
      return res.json(req.session.user);
    }else{
      return res.send(404);
    }
    
  },

  logout: function(req, res) {
    sails.log.info('logout start');
    req.session.destroy(function(err) {
      if(err){
        sails.log.error(err);
        return res.send(500, err);
      } 
      return res.json({});
    });
  }
	
};

