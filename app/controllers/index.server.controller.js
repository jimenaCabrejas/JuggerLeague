exports.render = function(req, res) {
    res.render('index', {
        title: 'Bienvenido a JuggerLeague'
    })
};
exports.render = function(req, res) {
    res.render('index', {
        title: 'JUGGERLEAGUE',
        tipo: req.user ? req.user.tipo : '',
        nombre: req.user ? req.user.username : '',
        equipo: req.user ? req.user.equipo : '',
        puntos: req.user ? req.user.puntos : '',
        email: req.user ? req.user.email : ''
    });
};
