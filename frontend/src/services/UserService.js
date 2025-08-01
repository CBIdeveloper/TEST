import Keycloak from 'keycloak-js';
// const _kc = new Keycloak("/keycloak.json")
const _kc = new Keycloak({
  url: 'https://adms.oeth.webcomm.com.tw/auth/',
  realm: 'adms',
  clientId: 'adms-portal',
  'public-client': true,
  'ssl-required': 'external',
});

const initKeycloak = () => {
  return new Promise((resolve) => {
    _kc
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          `${location.origin}/silent-check-sso.html`,
        pkceMethod: 'S256',
        // redirectUri: 'http://xx.xx.xx',
      })
      .then((authenticated) => {
        if (!authenticated) {
          console.log('user is not authenticated..!');
        }
        resolve();
      })
      .catch(console.error);
  });
};

const doLogin = _kc.login;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const clearToken = () => _kc.clearToken();

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  clearToken,
  getUsername,
  hasRole,
};

export default UserService;
