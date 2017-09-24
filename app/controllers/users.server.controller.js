var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
      console.log(users);
        if (err) {
            return next(err);
        }
        else {
            res.json(users);
        }
    });
};

exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};
exports.valida = function (req, res, next) {


    User.findByIdAndUpdate(req.params.usuarioId, { $set: {"tipo": "usuario"}}, {safe:true, upsert:true}, function(err, model) {console.log(err);});
    return res.redirect('/perfil');

};

exports.eliminaUser=function(req, res, next) {
 var user=req.params.usuarioId;

 User.findOneAndRemove({'_id' : user}, function (err,offer){
         res.redirect('/perfil');
       });
};

exports.renderPerfil=function(req, res, next) {
  User.find({}, null, {sort: { equipo: -1 }}, function(err, users) {
      if (err) {
          return next(err);
      }
      else {
        if (req.user) {
          res.render('index', {
            title: 'JUGGERLEAGUE',
            tipo: req.user ? req.user.tipo : '',
            nombre: req.user ? req.user.username : '',
            equipo: req.user ? req.user.equipo : '',
            puntos: req.user ? req.user.puntos : '',
            email: req.user ? req.user.email : '',
              "data": users
          });
        }

      }
  });
};
exports.renderLogin = function(req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Log-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    }
    else {
        return res.redirect('/');
    }
};

exports.renderRegister = function(req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register Form',
            messages: req.flash('error')
        });
    }
    else {
        return res.redirect('/');
    }
};

exports.renderConfigura = function(req, res, next) {
    if (req.user) {
        res.render('configura', {
            title: 'Configura Form',
            tipo: req.user ? req.user.username : ''
        });
    }
    else {
        return res.redirect('/');
    }
};

exports.register = function(req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function(err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/register');
            }

            req.login(user, function(err) {
                if (err)
                    return next(err);

                return res.redirect('/');
            });
        });
    }
    else {
        return res.redirect('/');
    }
};
exports.read = function(req, res) {
    res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
    User.findOne({
            _id: id
        },
        function(err, user) {
            if (err) {
                return next(err);
            }
            else {
                req.user = user;
                next();
            }
        }
    );
};
exports.updatePassword = function (req, res, next) {
    var user = req.user;
    user.password = req.body.password_1;

    user.save(function(err) {
        if (err) {
            var message = getErrorMessage(err);
            req.flash('error', message);
            return res.redirect('/config');
        }
        else {
          return res.redirect('/perfil');

        }
  });
};


exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.user);
        }
    })
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.saveOAuthUserProfile = function(req, profile, done) {
    User.findOne({
            provider: profile.provider,
            providerId: profile.providerId
        },
        function(err, user) {
            if (err) {
            return done(err);
            }
            else {
                if (!user) {
                    var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                    User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                        profile.username = availableUsername;
                        user = new User(profile);

                        user.save(function(err) {
                            if (err) {
                                var message = _this.getErrorMessage(err);
                                req.flash('error', message);
                                return res.redirect('/signup');
                            }

                            return done(err, user);
                        });
                    });
                }
                else {
                    return done(err, user);
                }
            }
        }
    );
};
