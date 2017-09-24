var port = 1337;

module.exports = {
    port: port,
    db: 'mongodb://localhost/todos',
    facebook: {
        clientID: '1304896889600254',
        clientSecret: '50a93ed6874bef872d655b40badbf4c7',
        callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
    }
};
