const { OAuth2Client } = require('google-auth-library');
const url = require('url');
const request = require('request-promise-native');

const keys = require('./client_secret_101830906594-d7arum73tv3iedrd5qo5ojes8o4hcbob.apps.googleusercontent.com');


const oAuth2Client = new OAuth2Client(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[1],
);
const authorizeUrl = oAuth2Client.generateAuthUrl({
  access_type: 'online',
  scope: ['email', 'profile', 'openid'],
});
/**
 * get으로 들어온 응답에 대해 실질적으로 사용가능한 정보로 return해줌
 * @param {string} get /이하 전부
 * @returns {object} id email name picture
 */
const code2Info = async (code) => {
  const r = await oAuth2Client.getToken(code);
  const info = await request.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${r.tokens.access_token}`,
  );

  return info;
};

module.exports = { authorizeUrl, code2Info };
