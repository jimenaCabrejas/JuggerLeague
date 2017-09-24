var shop = require('../../app/controllers/shop.server.controller');
var users = require('../../app/controllers/users.server.controller');


module.exports = function(app) {
  app.route('/tienda')
      .get(shop.renderTienda);

  app.route('/compra')
      .get(shop.renderCompra);

  app.route('/compra/:compraId').get(shop.compra);
  app.route('/elimina/:compraId').get(shop.elimina);
  app.route('/add').post(shop.add);




};
