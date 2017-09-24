var show = require('../controllers/show.server.controller');
module.exports = function(app) {

  app.route('/calendario')
     .get(show.renderCalendario);

	app.route('/combates')
     .get(show.renderCombates);

	app.route('/clasificacion')
     .get(show.renderClasificacion);

	app.route('/streaming')
     .get(show.renderStreaming);

	app.route('/endirecto')
		.get(show.renderEnDirecto);



};
