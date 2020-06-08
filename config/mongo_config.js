var env = {
    webPort: process.env.Port || 3000,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'seriousgame'
}

// var dburl_env = "mongodb+srv://seriousgame:1FLI4aDef1Xx6ABL@cluster0-upm9w.mongodb.net/test?retryWrites=true&w=majority"
var dburl_env = 'mongodb://' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase;

module.exports = {
    env,
    dburl_env,
    'secret' : 'supersecret'
};