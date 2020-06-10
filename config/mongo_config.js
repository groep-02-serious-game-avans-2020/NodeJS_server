var env = {
    webPort: process.env.PORT || 3050,
    dbHost: process.env.DB_HOST || 'ds133127.mlab.com',
    dbPort: process.env.DB_PORT || '33127',
    dbUser: process.env.DB_USER || 'shurvey-server',
    dbPassword: process.env.DB_PASSWORD || 'password123',
    dbDatabase: process.env.DB_DATABASE || 'shurvey'
}

// var dburl_env = "mongodb+srv://seriousgame:1FLI4aDef1Xx6ABL@cluster0-upm9w.mongodb.net/test?retryWrites=true&w=majority"
// var dburl_env = 'mongodb://' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase;
var dburl_env = `mongodb://${env.dbUser}:${env.dbPassword}@${env.dbHost}:${env.dbPort}/${env.dbDatabase}`;

module.exports = {
    env,
    dburl_env,
    'secret' : 'supersecret'
};