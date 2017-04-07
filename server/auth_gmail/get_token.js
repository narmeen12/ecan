var fs = require('fs');
var googleAuth = require('google-auth-library');
var GToken = require('../database/models/UserModel.js')

modules.exports = () => {

  function getAuthorizationToken(code, cb) {
    // Load client secrets
    fs.readFile('client_secret.json', function(err, data) {
      if (err) {
        return cb(err);
      }
      var credentials = JSON.parse(data);
      var clientSecret = credentials.web.client_secret;
      var clientId = credentials.web.client_id;
      var redirectUrl = credentials.web.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          return cb(err);
        }
     

        GToken.storeGAuth(JSON.stringify(token)) //store token in db

        return cb(null,token)
      });
    });
  }

  if (process.argv.length != 3) {
    console.log('usage: node get_token token');
    process.exit(1);
  }
  var token = process.argv[2];
  
}


