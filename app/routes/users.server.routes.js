var users = require('../../app/controllers/users.server.controller');
var passport=require('passport');

module.exports = function(app) {
  app.route('/users').post(users.create).get(users.list);

  app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);

  app.param('userId', users.userByID);

  app.route('/register')
      .get(users.renderRegister)
      .post(users.register);

      app.route('/config')
          .get(users.renderConfigura)
          .post(users.updatePassword);

  app.route('/login')
      .get(users.renderLogin)
      .post(passport.authenticate('local', {
          successRedirect: '/perfil',
          failureRedirect: '/login',
          failureFlash: true
      }));
  app.route('/perfil').get(users.renderPerfil);
  app.route('/validar/:usuarioId').get(users.valida);

  app.route('/eliminar/:usuarioId').get(users.eliminaUser);



  app.get('/logout', users.logout);

  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/login',
    scope:['email']
}));

app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope:['email']
}));
};
