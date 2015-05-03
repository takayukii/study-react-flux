/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

  login: function(req, res) {

    passport.authenticate('local', function(err, user, info){
      if ((err) || (!user)){
        console.log(err);
        return res.send({
          message: 'failure'
        });
      }
 
      req.logIn(user, function(err){

        if(err){
          return res.send({
            message: 'failure'
          });
        }
        
        return res.send({
          message: 'success',
          authUser: user.username
        });
      });

    })(req, res);
  },
	
};

