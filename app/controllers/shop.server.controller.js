var User = require('mongoose').model('User');
var Shop = require('mongoose').model('Shop');


exports.list = function(req, res, next) {
    Shop.find({}, function(err, shop) {
        if (err) {
            return next(err);
        }
        else {
            res.json(shop);
        }
    });
};

exports.compra=function(req, res, next) {
 var compra=req.params.compraId;
 var precio=Shop.findOne({producto: compra});

precio.select('precio');

// execute the query at a later time
precio.exec(function (err, product) {
  var cr = req.user.creditos - product.precio;
  User.findByIdAndUpdate(req.user.id, { $set: {"creditos": cr}}, {safe:true, upsert:true}, function(err, model) {console.log(err);});
})
    User.findByIdAndUpdate(req.user.id, { $push: {compras: compra}}, {safe:true, upsert:true}, function(err, model) {console.log(err);});
    res.redirect('/compra');
};

exports.elimina=function(req, res, next) {
 var compra=req.params.compraId;

 Shop.findOneAndRemove({'_id' : compra}, function (err,offer){
         res.redirect('/tienda');
       });
};

exports.modifica=function(req, res, next) {
 var precio = req.body.precio;
 var nivel = req.body.nivel;

Shop.findByIdAndUpdate(req.params.compraId, { $set: {"precio": precio}}, {safe:true, upsert:true}, function(err, model) {console.log(err);});
Shop.findByIdAndUpdate(req.params.compraId, { $set: {"nivel": nivel}}, {safe:true, upsert:true}, function(err, model) {console.log(err);});

res.redirect('/tienda');
};

exports.add = function(req, res, next) {
        var user = new Shop(req.body);
        var message = null;
        user.save(function(err) {
            if (err) {
                return res.redirect('/tienda');
            }
        });


    return res.redirect('/tienda');

};


exports.renderTienda = function(req, res, next) {
  Shop.find({}, function(err, shops) {
      if (err) {
          return next(err);
      }
      else {
        if (req.user) {
          res.render('tienda', {
              title: 'Tienda',
              tipo: req.user ? req.user.tipo : '',
              nivel: req.user ? req.user.puntos : '',
              credito: req.user ? req.user.creditos : '',
              compras: req.user ? req.user.compras : '',
              "data": shops
          });
        }
      }
  });

};

exports.renderCompra = function(req, res, next) {
    if (req.user) {
        res.render('compra', {
            title: 'Compra',
            tipo: req.user ? req.user.tipo : ''
        });
    }
    else {
        return res.redirect('/');
    }
};
