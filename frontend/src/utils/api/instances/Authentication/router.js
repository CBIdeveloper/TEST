import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  signIn: urlParser([ApiKey.authentication, ApiKey.signIn]),
  signOut: urlParser([ApiKey.authentication, ApiKey.signOut]),
  signInByIdentityNumber: urlParser([
    ApiKey.authentication,
    ApiKey.signInByIdentityNumber,
  ]),
  signInByZero: urlParser([
    ApiKey.authentication,
    ApiKey.signInByZero,
  ]),
  fidoGetSpTicket: urlParser([
    ApiKey.authentication,
    ApiKey.fidoGetSpTicket,
  ]),
  fidoRequestAthOrSignPush: urlParser([
    ApiKey.authentication,
    ApiKey.fidoRequestAthOrSignPush,
  ]),
  fidoGetAthOrSignResult: urlParser([
    ApiKey.authentication,
    ApiKey.fidoGetAthOrSignResult,
  ]),
});
