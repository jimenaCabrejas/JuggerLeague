var User = require('mongoose').model('User'),
    passport = require('passport');

exports.renderCalendario = function(req, res, next) {
    if (req.user) {
        res.render('calendario', {
            title: 'Calendario',
            tipo: req.user ? req.user.tipo : ''
        });
    }
    else {
        return res.redirect('/');
    }
};

exports.renderStreaming = function(req, res, next) {
    if (req.user) {
        res.render('streaming', {
            title: 'Streaming',
            tipo: req.user ? req.user.tipo : '',
            nombre : req.user ? req.user.username : ''
        });
    }
    else {
        return res.redirect('/');
    }
};


exports.renderCombatZone = function(req, res, next) {
    if (req.user) {
        res.render('combatzone', {
            title: 'Zona de Combate',
            tipo: req.user ? req.user.tipo : '',
            nombre : req.user ? req.user.username : ''
        });
    }
    else {
        return res.redirect('/');
    }
};


exports.renderCombates = function(req, res, next) {
  User.find({}, null, {sort: { equipo: -1 }}, function(err, users) {
      if (err) {
          return next(err);
      }
      else {
          //res.json(users);
          if (req.user) {
              res.render('combates', {
                  title: 'Combates',
                  tipo: req.user ? req.user.tipo : '',
                  equipo: req.user ? req.user.equipo : '',
                  "data": users
              });
          }
          else {
              return res.redirect('/perfil');
          }
      }
  });
};

exports.renderClasificacion = function(req, res, next) {
  User.find({}, null, {sort: { puntos: -1 }}, function(err, users) {
      if (err) {
          return next(err);
      }
      else {
          //res.json(users);
          if (req.user) {
              res.render('clasificacion', {
                  title: 'Clasificacion',
                  tipo: req.user ? req.user.tipo : '',
                  nombre: req.user ? req.user.username : '',
                  equipo: req.user ? req.user.equipo : '',
                  "data": users
              });
          }
          else {
              return res.redirect('/perfil');
          }
      }
  });
};

exports.renderEnDirecto = function(req, res, next) {

            if (req.user) {
              res.render('endirecto', {
              title: 'En directo',
              tipo: req.user ? req.user.tipo : '',
              nombre: req.user ? req.user.username : '',
              equipo: req.user ? req.user.equipo : ''
            });
          }
            else {
              res.render('endirecto', {
              title: 'En directo',
              tipo: ''
            });
            }

};
