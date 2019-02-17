// https://medium.com/@jackrobertscott/how-to-use-google-auth-api-with-node-js-888304f7e3a0

const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const url = require('url');


const request = require('request-promise-native');

// Download your OAuth2 configuration from the Google
const keys = require('./client_secret_101830906594-d7arum73tv3iedrd5qo5ojes8o4hcbob.apps.googleusercontent.com');

/**
 * Start by acquiring a pre-authenticated oAuth2 client.
 */
async function main() {
  const oAuth2Client = await getAuthenticatedClient();
  // Make a simple request to the People API using our pre-authenticated client. The `request()` method
  // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
  const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
  const res = await oAuth2Client.request({url});
  console.log(JSON.stringify(res.data));

  // After acquiring an access_token, you may want to check on the audience, expiration,
  // or original scopes requested.  You can do that with the `getTokenInfo` method.
  const tokenInfo = await oAuth2Client.getTokenInfo(
    oAuth2Client.credentials.access_token
  );
  console.log(tokenInfo);
}

/**
 * Create a new OAuth2Client, and go through the OAuth2 content
 * workflow.  Return the full client to the callback.
 */
function getAuthenticatedClient() {
  return new Promise((resolve, reject) => {
    // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'online',
      scope: ['email', 'profile', 'openid'],

    });

    // Open an http server to accept the oauth callback. In this simple example, the
    // only request to our webserver is to /oauth2callback?code=<code>
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/?code') > -1) {
            // acquire the code from the querystring, and close the web server.
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            console.log(req.url);
            console.log(qs);
            const code = qs.get('code');
            console.log(`Code is ${code}`);

            // Now that we have the code, use that to acquire tokens.
            const r = await oAuth2Client.getToken(code);
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(r.tokens);
            console.info('Tokens acquired.');
            // https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=
            // https://developers.google.com/apis-explorer/#p/oauth2/v2/
            //res.end(await request(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${r.tokens}`));
           const info =await request.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${oAuth2Client.credentials.access_token}`);
           res.end(info);
            resolve(oAuth2Client);
          }
          else{
            res.writeHead(302, {
              'Location': authorizeUrl
              //add other headers here...
            });
            res.end();
          }
        } catch (e) {
          res.writeHead(302, {
            'Location': authorizeUrl
            //add other headers here...
          });
          res.end();
        }
      })
      .listen(3000, '0.0.0.0', () => {
        // open the browser to the authorize url to start the workflow
        console.log(authorizeUrl);
      });

  });
}

main().catch(console.error);