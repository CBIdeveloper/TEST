import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  concat,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { baseURL } from '../ApiConfig';
import ApiKey from '../ApiKey';
import urlParser from '../../parsers/urlParser';
import {
  accessTokenExpireCheck,
  getAccessToken,
  removeTokens,
} from '../../auth/auth';

import ApiService from '../ApiService';
import ModalHelper from '../../helper/ModalHelper';
import StatusCodeHelper from '../../helper/StatusCodeHelper';

const httpLink = new HttpLink({ uri: urlParser([baseURL, ApiKey.graphql]) });

const activityMiddleware = new ApolloLink((operation, forward) => {
  if (accessTokenExpireCheck()) {
    return forward(operation);
  }
  return null;
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: getAccessToken(),
  },
}));

const logoutLink = onError(({ networkError }) => {
  const responseMessage = `未知的錯誤（${networkError.statusCode}）`;
  console.log('networkError.statusCode', networkError.statusCode);
  let callback = () => {};
  if (networkError.statusCode === 403) {
    ApiService.authentication.signOut().then((response) => {
      if (response.executed) {
        removeTokens();
      }
    });
    callback = () => {
      window.open('/frontend/login', '_self');
    };
  }
  if (networkError.statusCode === 401 || networkError.statusCode == undefined) {
    ApiService.authentication.signOut().then((response) => {
      if (response.executed) {
        removeTokens();
      }
    });
    callback = () => {
      window.open('/frontend/login', '_self');
    };
  }
  const message = StatusCodeHelper.getMessage({
    code: networkError.result.Code,
    status: networkError.statusCode,
    responseMessage,
  });
  ModalHelper.openMessageModal({
    message,
    callback,
  });
});

const apolloInstance = new ApolloClient({
  // uri: urlParser([baseURL, ApiKey.graphql]),
  cache: new InMemoryCache(),
  name: 'AdmSystem',
  version: '1.0.0',
  link: concat(
    activityMiddleware,
    logoutLink.concat(authLink.concat(httpLink)),
  ),
});

export default apolloInstance;
